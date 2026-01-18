const fs = require('fs');
const axios = require('axios');

async function main() {
    try {

        const username = 'akhilthirunalveli';
        const token = process.env.GH_TOKEN;

        if (!token) {
            throw new Error('GH_TOKEN is not defined. Please set it in your environment.');
        }

        const headers = {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const query = `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

        const response = await axios.post('https://api.github.com/graphql', { query }, { headers });

        if (response.data.errors) {
            console.error('GraphQL Errors:', response.data.errors);
            throw new Error('GitHub API returned errors');
        }

        const calendar = response.data.data.user.contributionsCollection.contributionCalendar;
        const currentYearTotal = calendar.totalContributions; // This is strictly "last year" by GitHub definition (last 365 days)? 
        // Actually contributionCalendar default is last year. 
        // Let's modify query to get specific years if needed, but standard "Contributions in the last year" is usually what people want.
        // However, the user asked for "Current Year" and "Last Year". 
        // GraphQL `contributionsCollection` accepts `from` and `to`.
        // We need two queries or one query with arguments.
        // Let's do two queries to be precise about "2026" and "2025".

        const currentYear = new Date().getFullYear();
        const lastYear = currentYear - 1;

        // Helper to fetch year
        const fetchYear = async (year) => {
            const from = `${year}-01-01T00:00:00Z`;
            const to = `${year}-12-31T23:59:59Z`;
            const q = `
          query {
            user(login: "${username}") {
              contributionsCollection(from: "${from}", to: "${to}") {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `;
            const res = await axios.post('https://api.github.com/graphql', { query: q }, { headers });
            return res.data.data.user.contributionsCollection.contributionCalendar;
        };

        console.log(`Fetching data for ${currentYear} and ${lastYear}...`);
        const [currentYearData, lastYearData] = await Promise.all([
            fetchYear(currentYear),
            fetchYear(lastYear)
        ]);

        const currentYearTotalContributions = currentYearData.totalContributions;
        const lastYearTotalContributions = lastYearData.totalContributions;

        // Merge all days for streak calculation
        // We need a continuous list. Current year data is enough for current streak usually, 
        // but longest streak might span years or be in last year.
        // Let's combine them. Note: currentYearData starts Jan 1. 
        // If streak crosses Dec 31/Jan 1, we need continuity. 
        // The previous API gave all years. 
        // Let's stick to these two years for simplicity, or fetch more if needed. 
        // The user's longest streak is 93. 

        // Flatten weeks to days
        const flatDays = [
            ...lastYearData.weeks.flatMap(w => w.contributionDays),
            ...currentYearData.weeks.flatMap(w => w.contributionDays)
        ];

        // Remove duplicates if any (though years shouldn't overlap)
        // Sort just in case
        const contributions = flatDays.sort((a, b) => new Date(b.date) - new Date(a.date));

        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        // Longest Streak
        // Iterate ascending
        const ascending = [...contributions].reverse();
        for (const day of ascending) {
            if (day.contributionCount > 0) {
                tempStreak++;
            } else {
                if (tempStreak > longestStreak) longestStreak = tempStreak;
                tempStreak = 0;
            }
        }
        if (tempStreak > longestStreak) longestStreak = tempStreak;

        // Current Streak
        const today = new Date().toISOString().split('T')[0];

        let startIndex = contributions.findIndex(c => c.date === today);
        if (startIndex === -1) {
            startIndex = contributions.findIndex(c => c.date < today);
        }

        console.log(`Today (UTC): ${today}`);
        if (startIndex !== -1) {
            console.log(`Found start date: ${contributions[startIndex].date}, count: ${contributions[startIndex].contributionCount}`);
        }

        if (startIndex !== -1) {
            const startDay = contributions[startIndex];
            // Check Today
            if (startDay.contributionCount > 0) {
                console.log("Starting streak from Today");
                currentStreak++;
                startIndex++;
                while (startIndex < contributions.length && contributions[startIndex].contributionCount > 0) {
                    currentStreak++;
                    startIndex++;
                }
            } else {
                // Check Yesterday
                if (startIndex + 1 < contributions.length && contributions[startIndex + 1].contributionCount > 0) {
                    console.log("Starting streak from Yesterday");
                    currentStreak = 0; // Reset
                    let i = startIndex + 1;
                    while (i < contributions.length && contributions[i].contributionCount > 0) {
                        currentStreak++;
                        i++;
                    }
                } else {
                    console.log("Streak broken");
                    currentStreak = 0;
                }
            }
        }
        console.log(`Calculated Current Streak: ${currentStreak}`);

        // Generate SVG
        const svg = generateSVG({
            currentStreak,
            longestStreak,
            currentYearTotal: currentYearTotalContributions,
            lastYearTotal: lastYearTotalContributions,
            currentYear,
            lastYear
        });

        fs.writeFileSync('stats.svg', svg);
        console.log('Successfully generated stats.svg');

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



function generateSVG(stats) {
    const width = 800;
    const height = 150;

    // Style for theme support (maintaining this as it's standard)
    // Removed animations for stability
    const style = `
    <style>
      .label { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #64748b; }
      .value { font: 800 32px 'Segoe UI', Ubuntu, Sans-Serif; }
      .icon { font-size: 32px; fill: #64748b; }
      
      /* Light Mode Default */
      .value { fill: #0f172a; }
      
      /* Dark Mode Override */
      @media (prefers-color-scheme: dark) {
        .value { fill: #f8fafc; }
        .label { fill: #94a3b8; }
        .divider { stroke: #30363d; }
      }
      @media (prefers-color-scheme: light) {
         .divider { stroke: #e2e8f0; }
      }
    </style>
    `;

    // Helper to center text at a specific x, y
    const renderGroup = (index, icon, label, value) => {
        const colWidth = width / 4;
        const centerX = (index * colWidth) + (colWidth / 2);
        const startY = 50; // Base Y position

        return `
        <!-- Group ${index + 1} -->
        <text x="${centerX}" y="${startY}" text-anchor="middle" class="icon">${icon}</text>
        <text x="${centerX}" y="${startY + 35}" text-anchor="middle" class="label">${label}</text>
        <text x="${centerX}" y="${startY + 70}" text-anchor="middle" class="value">${value}</text>
        
        <!-- Divider (except for last item) -->
        ${index < 3 ? `<path class="divider" d="M${(index + 1) * colWidth} 40 L${(index + 1) * colWidth} 110" stroke="#cbd5e1" stroke-width="1" stroke-linecap="round" opacity="0.3" />` : ''}
        `;
    };

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${style}
      
      ${renderGroup(0, '🔥', 'Current Streak', stats.currentStreak)}
      ${renderGroup(1, '🏆', 'Longest Streak', stats.longestStreak)}
      ${renderGroup(2, '📅', `Total ${stats.currentYear}`, stats.currentYearTotal)}
      ${renderGroup(3, '⏪', `Total ${stats.lastYear}`, stats.lastYearTotal)}

    </svg>
    `;
}

main();

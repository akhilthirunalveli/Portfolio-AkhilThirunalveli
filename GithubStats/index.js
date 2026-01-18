const fs = require('fs');
const axios = require('axios');

async function main() {
    try {
        const username = 'akhilthirunalveli';
        const response = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}`);
        const data = response.data;

        const currentYear = new Date().getFullYear();
        const lastYear = currentYear - 1;

        const currentYearTotal = data.total[currentYear] || 0;
        const lastYearTotal = data.total[lastYear] || 0;


        // Calculate streaks
        // Sort contributions by date descending to ensure continuity (2026 -> 2025 -> ...)
        const contributions = data.contributions.sort((a, b) => new Date(b.date) - new Date(a.date));

        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        // Longest Streak (iterate ascending for simplicity or just use the logic on descending)
        // Let's use ascending for longest streak to be intuitive
        const ascending = [...contributions].reverse();
        for (const day of ascending) {
            if (day.count > 0) {
                tempStreak++;
            } else {
                if (tempStreak > longestStreak) longestStreak = tempStreak;
                tempStreak = 0;
            }
        }
        if (tempStreak > longestStreak) longestStreak = tempStreak;

        // Current Streak
        const today = new Date().toISOString().split('T')[0];

        // Find today
        let startIndex = contributions.findIndex(c => c.date === today);
        // If today is not found (e.g. API hasn't updated for new day yet?), find the latest date before today
        if (startIndex === -1) {
            startIndex = contributions.findIndex(c => c.date < today);
        }

        if (startIndex !== -1) {
            const startDay = contributions[startIndex];
            // Check Today
            if (startDay.count > 0) {
                currentStreak++;
                startIndex++;
                while (startIndex < contributions.length && contributions[startIndex].count > 0) {
                    currentStreak++;
                    startIndex++;
                }
            } else {
                // Check Yesterday
                if (startIndex + 1 < contributions.length && contributions[startIndex + 1].count > 0) {
                    currentStreak = 0; // Reset
                    let i = startIndex + 1;
                    while (i < contributions.length && contributions[i].count > 0) {
                        currentStreak++;
                        i++;
                    }
                } else {
                    currentStreak = 0;
                }
            }
        }


        // Generate SVG
        const svg = generateSVG({
            currentStreak,
            longestStreak,
            currentYearTotal,
            lastYearTotal,
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

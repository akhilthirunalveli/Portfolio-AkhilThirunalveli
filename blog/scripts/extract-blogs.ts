import { blogPosts } from '../lib/blog-data';
import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'content/blogs');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

blogPosts.forEach(post => {
  const filePath = path.join(outDir, `${post.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');
  console.log(`Wrote ${filePath}`);
});

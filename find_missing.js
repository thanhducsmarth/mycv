const fs = require('fs');
const pageContent = fs.readFileSync('app/page.tsx', 'utf-8');
const { execSync } = require('child_process');

const allWebp = execSync('find public/images -type f -name "*.webp"').toString().split('\n').filter(Boolean).map(s => s.replace('public', ''));

const missing = [];
for (const img of allWebp) {
  if (img === '/images/about-profile.webp' || img === '/images/hero-background.webp') continue;
  if (!pageContent.includes(img)) {
    missing.push(img);
  }
}
console.log(missing.join('\n'));

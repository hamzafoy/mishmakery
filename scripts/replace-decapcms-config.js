import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adjust these paths to match mishmakery’s structure
const templatePath = join(__dirname, '../public/admin/config.template.yml');
const outputPath = join('dist', 'mishmakery', 'browser', 'admin', 'config.yml'); // or wherever Vercel serves it from

let contents = readFileSync(templatePath, 'utf8');

const replacements = {
  '${CLOUDINARY_API_KEY}': process.env.CLOUDINARY_API_KEY || '',
  '${CLOUDINARY_API_SECRET}': process.env.CLOUDINARY_API_SECRET || '',
  '${GITHUB_CLIENT_ID}': process.env.GITHUB_CLIENT_ID || '',
  '${GITHUB_CLIENT_SECRET}': process.env.GITHUB_CLIENT_SECRET || ''
  // add any other placeholders you use
};

for (const [placeholder, value] of Object.entries(replacements)) {
  contents = contents.replace(new RegExp(placeholder, 'g'), value);
}

writeFileSync(outputPath, contents, 'utf8');
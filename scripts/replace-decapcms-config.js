import { readFileSync, writeFileSync } from 'fs';

const filePath = 'public/admin/config.yml';
let contents = readFileSync(filePath, 'utf8');

contents = contents
  .replace('${CLOUDINARY_API_KEY}', process.env.CLOUDINARY_API_KEY || '')
  .replace('${CLOUDINARY_API_SECRET}', process.env.CLOUDINARY_API_SECRET || '')
  .replace('${GITHUB_CLIENT_ID}', process.env.GITHUB_CLIENT_ID || '')
  .replace('${GITHUB_CLIENT_SECRET}', process.env.GITHUB_CLIENT_SECRET || '');

writeFileSync(filePath, contents, 'utf8');
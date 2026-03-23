import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Template in repo (source)
const templatePath = join(__dirname, '../public/admin/config.template.yml');

// Detect output path:
// - Always write to public/admin/config.yml (source folder)
// - Angular's build step copies public/ → dist/mishmakery/
// - This ensures config.yml is included in the build output
const isVercel = !!process.env.VERCEL;

// For consistency, log environment
if (isVercel) {
  console.log('[Decap CMS Config] Running on Vercel');
} else {
  console.log('[Decap CMS Config] Running locally');
}

const outputDir = 'public/admin';
const outputPath = join(outputDir, 'config.yml');

// Verify template exists
if (!existsSync(templatePath)) {
  console.error(`[Decap CMS Config] ERROR: Template not found at ${templatePath}`);
  process.exit(1);
}

console.log('[Decap CMS Config] Template:', templatePath);
console.log('[Decap CMS Config] Output:', outputPath);

let contents = readFileSync(templatePath, 'utf8');

// Strict mode: fail if required vars are missing
const strictMode = process.env.STRICT_CONFIG === '1' || process.env.STRICT_CONFIG === 'true' || !isVercel;
const requiredVars = ['GITHUB_CLIENT_ID', 'CLOUDINARY_API_KEY', 'AUTH_ENDPOINT', 'AUTH_TOKEN_ENDPOINT'];
const allVars = ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', 'AUTH_ENDPOINT', 'AUTH_TOKEN_ENDPOINT'];

console.log('[Decap CMS Config] Strict mode:', strictMode);

// Check for required vars
const missing = [];
for (const varName of requiredVars) {
  if (!process.env[varName]) {
    missing.push(varName);
  }
}

if (missing.length > 0) {
  const msg = `Missing required environment variables: ${missing.join(', ')}`;
  if (strictMode) {
    console.error(`[Decap CMS Config] ERROR: ${msg}`);
    process.exit(2);
  } else {
    console.warn(`[Decap CMS Config] WARNING: ${msg}`);
  }
}

// Replace placeholders
const replaced = {};
for (const varName of allVars) {
  const placeholder = `${varName}`;
  const value = process.env[varName] || '';
  contents = contents.replace(new RegExp(placeholder, 'g'), value);
  replaced[varName] = value ? '***' : '<empty>';
}

// Ensure output directory exists
try {
  mkdirSync(dirname(outputPath), { recursive: true });
} catch (err) {
  process.exit(3);
}

// Write output
try {
  writeFileSync(outputPath, contents, 'utf8');
  console.log('[Decap CMS Config] SUCCESS: Wrote config to', outputPath);
} catch (err) {
  process.exit(4);
}
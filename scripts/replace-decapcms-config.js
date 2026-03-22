const fs = require('fs');
const path = require('path');

// Template in repo
const templatePath = path.join(__dirname, '..', 'public', 'admin', 'config.yml.template');

// Determine output path:
// - When running on Vercel, prefer process.env.VERCEL_OUTPUT_DIR if set
// - Allow override with CONFIG_OUT_DIR (useful in Vercel project settings)
// - Fallback to the local public/admin path for dev
const vercelFallback = '/vercel/path0/dist/mishmakery'; // user's Vercel output location
const outDirCandidate = process.env.CONFIG_OUT_DIR || process.env.VERCEL_OUTPUT_DIR || vercelFallback;
const outPath = path.join(outDirCandidate, 'admin', 'config.yml');

if (!fs.existsSync(templatePath)) {
  console.error('Template not found:', templatePath);
  process.exit(1);
}

let content = fs.readFileSync(templatePath, 'utf8');

// Support ${VAR} and ${VAR:-default} syntax
content = content.replace(/\$\{([A-Z0-9_]+)(?:\:-([^}]*))?\}/g, (match, name, defaultValue) => {
  const val = process.env[name];
  if (val === undefined || val === '') {
    if (defaultValue !== undefined) return defaultValue;
    const strict = process.env.STRICT_CONFIG === '1' || process.env.STRICT_CONFIG === 'true';
    if (strict) {
      console.error(`Missing required environment variable: ${name}`);
      process.exit(2);
    }
    console.warn(`Warning: environment variable ${name} is not set. Replacing with empty string.`);
    return '';
  }
  return val;
});

// Ensure destination directory exists
const outDir = path.dirname(outPath);
try {
  fs.mkdirSync(outDir, { recursive: true });
} catch (err) {
  console.error('Failed to create directory', outDir, err);
  process.exit(3);
}

fs.writeFileSync(outPath, content, 'utf8');
console.log('Wrote', outPath);
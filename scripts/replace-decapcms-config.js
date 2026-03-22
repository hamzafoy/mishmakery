const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'public', 'admin', 'config.yml.template');
const outPath = path.join(__dirname, '..', 'public', 'admin', 'config.yml');

if (!fs.existsSync(templatePath)) {
  console.error('Template not found:', templatePath);
  process.exit(1);
}

let content = fs.readFileSync(templatePath, 'utf8');

content = content.replace(/\$\{([A-Z0-9_]+)\}/g, (match, name) => {
  const val = process.env[name];
  if (val === undefined) {
    console.warn(`Warning: environment variable ${name} is not set. Replacing with empty string.`);
    return '';
  }
  return val;
});

fs.writeFileSync(outPath, content, 'utf8');
console.log('Wrote', outPath);
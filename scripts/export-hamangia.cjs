const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'T:\\DESKTOP\\hamangia-studio';
const ROADMAP_PATH = 'T:\\DESKTOP\\HAMANGIA-DOCS\\ROADMAP_ARHITECTURA.md';
const OUTPUT_FILE = 'T:\\DESKTOP\\HAMANGIA-CODEBASE-CLEAN.txt';
const BACKUP_OUTPUT = 'C:\\Users\\tudor\\Desktop\\HAMANGIA-CODEBASE-CLEAN.txt';

const ALLOWED_EXTS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs',
  '.json', '.css', '.html', '.sql', '.md'
]);

const IGNORED_NAMES = new Set([
  'node_modules',
  '.git',
  '.vercel',
  'dist',
  'dist-ssr',
  'product-images-3310851',
  'heavenlynova',
  '.env',
  '.env.local',
  '.env.example',
  '.env.production',
  '.env.development',
  'package-lock.json',
  '.DS_Store'
]);

// Directories inside public to skip (binary assets)
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.vercel',
  'dist',
  'dist-ssr',
  'Assets',
  'images'
]);

const SENSITIVE_PATTERNS = [
  /sk_live_[a-zA-Z0-9_-]+/g,
  /rk_live_[a-zA-Z0-9_-]+/g,
  /whsec_[a-zA-Z0-9_-]+/g,
  /pk_live_[a-zA-Z0-9_-]+/g,
  /sk_test_[a-zA-Z0-9_-]+/g,
  /pk_test_[a-zA-Z0-9_-]+/g,
  /re_[a-zA-Z0-9_-]{20,}/g,
  /eyJ[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}/g
];

function sanitizeContent(content) {
  let clean = content;
  for (const pattern of SENSITIVE_PATTERNS) {
    clean = clean.replace(pattern, '[REDACTED_SECRET]');
  }
  return clean;
}

function shouldProcessFile(filePath) {
  const base = path.basename(filePath);
  if (IGNORED_NAMES.has(base)) return false;
  if (base.startsWith('.env')) return false;

  const ext = path.extname(filePath).toLowerCase();
  return ALLOWED_EXTS.has(ext);
}

function getFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (IGNORED_NAMES.has(entry.name)) continue;
    if (IGNORED_DIRS.has(entry.name)) continue;

    if (entry.isDirectory()) {
      getFiles(fullPath, fileList);
    } else if (entry.isFile() && shouldProcessFile(fullPath)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

console.log('Scanning codebase for HAMANGIA Studio...');
const allFiles = getFiles(ROOT_DIR);
console.log(`Found ${allFiles.length} source/config files.`);

let out = '';
out += '===============================================================================\n';
out += 'HAMANGIA STUDIO (hamangiastudio.ro) — CLEAN CODEBASE EXPORT FOR CLAUDE AI\n';
out += `Generated on: ${new Date().toISOString()}\n`;
out += 'Security Guarantee: All .env files, private tokens, live Stripe keys, Resend keys, and JWTs have been strictly redacted.\n';
out += 'Platform: React 19 + TypeScript + Vite + Tailwind CSS + Supabase + Stripe / Ramburs\n';
out += 'Domain: hamangiastudio.ro | Local Dev: http://localhost:3001\n';
out += '===============================================================================\n\n';

if (fs.existsSync(ROADMAP_PATH)) {
  out += '/* ═════════════════════════════════════════════════════════════════════════════\n';
  out += '   PROJECT SPECIFICATION & ROADMAP: ROADMAP_ARHITECTURA.md\n';
  out += '   ═════════════════════════════════════════════════════════════════════════════ */\n\n';
  out += sanitizeContent(fs.readFileSync(ROADMAP_PATH, 'utf8'));
  out += '\n\n';
}

out += '### PROJECT FILE TREE:\n';
for (const f of allFiles) {
  const rel = path.relative(ROOT_DIR, f).replace(/\\/g, '/');
  out += `- ${rel}\n`;
}
out += '\n===============================================================================\n\n';

for (const f of allFiles) {
  const rel = path.relative(ROOT_DIR, f).replace(/\\/g, '/');
  console.log(`Packing: ${rel}`);
  
  let content = fs.readFileSync(f, 'utf8');
  content = sanitizeContent(content);

  out += `\n/* ─────────────────────────────────────────────────────────────────────────────\n`;
  out += `   FILE: ${rel}\n`;
  out += `   ────────────────────────────────────────────────────────────────────────── */\n\n`;
  out += content;
  out += '\n';
}

fs.writeFileSync(OUTPUT_FILE, out, 'utf8');
console.log(`Successfully generated: ${OUTPUT_FILE} (${(Buffer.byteLength(out, 'utf8') / 1024).toFixed(2)} KB)`);

try {
  fs.writeFileSync(BACKUP_OUTPUT, out, 'utf8');
  console.log(`Successfully mirrored to: ${BACKUP_OUTPUT}`);
} catch (e) {
  // ignore if path not found
}

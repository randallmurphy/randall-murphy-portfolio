/**
 * fix-svg-icons.mjs  —  Run from your project root:
 *   node fix-svg-icons.mjs
 *
 * Converts every SVG-disguised-as-.png in src/assets/tech/ and
 * src/assets/icons/ into a real 256x256 PNG so Three.js can load them.
 *
 * Uses `sharp` which works on Windows without any native DLLs.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

// ── Make sure sharp is available ──────────────────────────────────────────
let sharp;
try {
  sharp = (await import('sharp')).default;
  console.log('✅ sharp already installed\n');
} catch {
  console.log('📦 Installing sharp (one-time setup)...');
  execSync('npm install --save-dev sharp', { stdio: 'inherit' });
  sharp = (await import('sharp')).default;
  console.log('');
}

// ── Folders to scan ───────────────────────────────────────────────────────
const DIRS = ['src/assets/tech', 'src/assets/icons'];
const SIZE = 256;

let converted = 0;
let skipped   = 0;
let failed    = 0;

for (const folder of DIRS) {
  const abs = resolve(folder);

  if (!existsSync(abs)) {
    console.log(`⚠️  Skipping (not found): ${folder}`);
    continue;
  }

  console.log(`\n📁 Scanning: ${folder}`);
  console.log('─'.repeat(50));

  const files = readdirSync(abs).filter(f => f.endsWith('.png'));

  if (files.length === 0) {
    console.log('   (no .png files found)');
    continue;
  }

  for (const filename of files) {
    const filepath = join(abs, filename);
    const raw = readFileSync(filepath);

    // ── Detect SVG by content, not extension ──────────────────────────
    const header = raw.slice(0, 1024).toString('utf8');
    const isSVG  =
      header.includes('<svg') ||
      header.includes('<?xml') ||
      header.includes('xmlns="http://www.w3.org/2000/svg"');

    // Also check PNG magic bytes: first 8 bytes = 89 50 4E 47 0D 0A 1A 0A
    const isPNG =
      raw[0] === 0x89 &&
      raw[1] === 0x50 &&
      raw[2] === 0x4e &&
      raw[3] === 0x47;

    if (isPNG) {
      console.log(`   ✓  Already real PNG: ${filename}  (${raw.length} bytes)`);
      skipped++;
      continue;
    }

    if (!isSVG) {
      console.log(`   ⚠️  Unknown format, skipping: ${filename}`);
      skipped++;
      continue;
    }

    const sizeBefore = raw.length;
    process.stdout.write(`   🔄 Converting SVG→PNG: ${filename} ... `);

    try {
      const pngBuffer = await sharp(raw, { density: 192 })
        .resize(SIZE, SIZE, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // transparent bg
        })
        .png({ compressionLevel: 9 })
        .toBuffer();

      writeFileSync(filepath, pngBuffer);
      console.log(`✅  (${sizeBefore} → ${pngBuffer.length} bytes)`);
      converted++;
    } catch (err) {
      console.log(`❌  ERROR: ${err.message}`);
      failed++;
    }
  }
}

// ── Summary ───────────────────────────────────────────────────────────────
console.log('\n' + '='.repeat(50));
console.log(`✅  Converted : ${converted} files`);
console.log(`⏭️   Skipped   : ${skipped} files`);
if (failed > 0) {
  console.log(`❌  Failed    : ${failed} files`);
  console.log('\nFor failed files, manually download a PNG version from:');
  console.log('  → https://devicons.dev');
  console.log('  → https://simpleicons.org');
}
console.log('\n▶  Now restart your dev server:');
console.log('   npm run dev');
console.log('='.repeat(50) + '\n');

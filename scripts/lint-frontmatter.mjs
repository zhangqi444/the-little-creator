#!/usr/bin/env node
/**
 * lint-frontmatter.mjs
 *
 * Validates frontmatter in all content docs files.
 * Required fields for guides and for-educators pages:
 *   title, description, tags, audience, level, season
 *
 * Exit code 0 = clean; 1 = violations found.
 * Usage: node scripts/lint-frontmatter.mjs [--quiet]
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const QUIET = process.argv.includes('--quiet');
const DOCS_DIR = 'src/content/docs';

// Sections that require full frontmatter
const STRICT_SECTIONS = ['guides', 'for-educators'];

// Required fields for strict-section pages
const REQUIRED_FIELDS = ['title', 'description', 'tags', 'audience', 'level', 'season'];

// Frontmatter parser (minimal — handles the simple YAML we use)
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const raw = match[1];
  const fields = {};
  for (const line of raw.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      fields[key] = true;
    }
  }
  return fields;
}

function walkDir(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkDir(full, files);
    } else if (extname(entry) === '.md') {
      files.push(full);
    }
  }
  return files;
}

let violations = 0;
let checked = 0;

for (const filepath of walkDir(DOCS_DIR)) {
  // Determine if this file is in a strict section
  const rel = filepath.replace(DOCS_DIR + '/', '');
  const section = rel.split('/')[0];
  if (!STRICT_SECTIONS.includes(section)) continue;

  // Skip index files — they use different frontmatter
  if (rel.endsWith('index.md')) continue;

  checked++;
  const content = readFileSync(filepath, 'utf8');
  const fm = parseFrontmatter(content);

  if (!fm) {
    console.error(`MISSING FRONTMATTER: ${filepath}`);
    violations++;
    continue;
  }

  const missing = REQUIRED_FIELDS.filter(f => !fm[f]);
  if (missing.length > 0) {
    console.error(`MISSING FIELDS [${missing.join(', ')}]: ${filepath}`);
    violations++;
  }
}

if (!QUIET || violations > 0) {
  console.log(`\nFrontmatter lint: checked ${checked} pages, ${violations} violation(s).`);
}

process.exit(violations > 0 ? 1 : 0);

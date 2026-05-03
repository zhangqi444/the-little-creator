#!/usr/bin/env node
// Validates the Claude Skill bundle in skill/.
//
// Today: enforces SKILL.md frontmatter and prints a one-line summary so
// the bundle stays well-formed as we add files. Future scope (when we
// have wiki content worth deduplicating into the skill): sync selected
// templates and code-adjacent reference from src/content/docs/ into
// skill/. We deliberately don't bundle the whole wiki — the skill is
// for code generation, not chat retrieval; that's the Custom GPT's job.

import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SKILL_DIR = join(ROOT, 'skill');

const REQUIRED_FIELDS = ['name', 'description'];

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (/^\s+/.test(line)) continue;
    const km = line.match(/^([a-zA-Z_][\w-]*)\s*:\s*(.*)$/);
    if (!km) continue;
    let v = km[2].trim();
    if (!v) continue;
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    data[km[1]] = v;
  }
  return data;
}

async function walk(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...await walk(full, rel));
    else out.push(rel);
  }
  return out;
}

async function main() {
  let skillMd;
  try {
    skillMd = await readFile(join(SKILL_DIR, 'SKILL.md'), 'utf8');
  } catch {
    console.error(`Error: skill/SKILL.md not found at ${SKILL_DIR}/SKILL.md`);
    process.exit(1);
  }

  const fm = parseFrontmatter(skillMd);
  if (!fm) {
    console.error('Error: skill/SKILL.md is missing YAML frontmatter (--- … ---).');
    process.exit(1);
  }

  const missing = REQUIRED_FIELDS.filter((f) => !fm[f]);
  if (missing.length > 0) {
    console.error(`Error: skill/SKILL.md frontmatter missing required field(s): ${missing.join(', ')}`);
    process.exit(1);
  }

  const files = await walk(SKILL_DIR);
  const templates = files.filter((f) => f.startsWith('templates/'));
  const examples = files.filter((f) => f.startsWith('examples/'));
  const knowledge = files.filter((f) => f.startsWith('knowledge/'));

  console.log(`Skill bundle: ${fm.name}`);
  console.log(
    `  ${templates.length} template(s), ${examples.length} example(s), ${knowledge.length} knowledge file(s), ${files.length} total file(s).`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

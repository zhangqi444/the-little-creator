#!/usr/bin/env node
// Validates the Claude Skill bundle in skill/.
//
// Today: walks the bundle, validates every SKILL.md it finds (top-level
// plus any subdirectory like skill/ingest-source/SKILL.md), enforces
// required frontmatter fields, and prints a one-line summary so the
// bundle stays well-formed as we add files. Future scope (when we have
// wiki content worth deduplicating into the skill): sync selected
// templates and code-adjacent reference from src/content/docs/ into
// skill/. We deliberately don't bundle the whole wiki — the skill is
// for code generation and structured workflows, not chat retrieval.

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

async function validateSkill(relPath) {
  const fullPath = join(SKILL_DIR, relPath);
  const raw = await readFile(fullPath, 'utf8');
  const fm = parseFrontmatter(raw);
  if (!fm) {
    return { ok: false, error: `${relPath}: missing YAML frontmatter` };
  }
  const missing = REQUIRED_FIELDS.filter((f) => !fm[f]);
  if (missing.length > 0) {
    return { ok: false, error: `${relPath}: frontmatter missing required field(s): ${missing.join(', ')}` };
  }
  return { ok: true, name: fm.name, description: fm.description, path: relPath };
}

async function main() {
  let files;
  try {
    files = await walk(SKILL_DIR);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.error(`Error: skill/ directory not found at ${SKILL_DIR}`);
      process.exit(1);
    }
    throw e;
  }

  const skillFiles = files.filter((f) => f === 'SKILL.md' || f.endsWith('/SKILL.md'));
  if (skillFiles.length === 0) {
    console.error('Error: no SKILL.md found in skill/. At minimum, skill/SKILL.md must exist.');
    process.exit(1);
  }

  const results = await Promise.all(skillFiles.map(validateSkill));
  const errors = results.filter((r) => !r.ok);
  if (errors.length > 0) {
    for (const e of errors) console.error(`Error: ${e.error}`);
    process.exit(1);
  }

  const templates = files.filter((f) => f.startsWith('templates/'));
  const examples = files.filter((f) => f.startsWith('examples/'));
  const knowledge = files.filter((f) => f.startsWith('knowledge/'));

  const sortedSkills = results.slice().sort((a, b) => a.path.localeCompare(b.path));
  console.log(`Skill bundle: ${sortedSkills.length} skill(s) validated`);
  for (const s of sortedSkills) {
    console.log(`  - ${s.name} (${s.path})`);
  }
  console.log(
    `  ${templates.length} template(s), ${examples.length} example(s), ${knowledge.length} knowledge file(s), ${files.length} total file(s).`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

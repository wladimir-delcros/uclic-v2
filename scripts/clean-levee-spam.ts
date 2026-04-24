/**
 * Cleanup the AI-injected CTA spam paragraphs from levees_de_fonds.content_html
 * and blog_posts.content in Supabase.
 *
 * Usage (from /home/claude/uclic-v2):
 *   ./node_modules/.bin/tsx scripts/clean-levee-spam.ts             # dry-run
 *   ./node_modules/.bin/tsx scripts/clean-levee-spam.ts --apply     # write back
 *   ./node_modules/.bin/tsx scripts/clean-levee-spam.ts --slug=X    # single post
 *
 * Reads SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY from .env.local.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { sanitizeCmsContent } from '../src/lib/sanitize-content';

function loadEnv() {
  try {
    const raw = readFileSync('.env.local', 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) process.env[m[1]] = m[2].replace(/^"(.*)"$/, '$1');
    }
  } catch {
    // ignore
  }
}

loadEnv();

const apply = process.argv.includes('--apply');
const slugArg = process.argv.find((a) => a.startsWith('--slug='))?.split('=')[1];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supa = createClient(url, key, { auth: { persistSession: false } });

async function cleanTable(
  table: 'levees_de_fonds' | 'blog_posts',
  column: 'content_html',
) {
  console.log(`\n=== ${table}.${column} (${apply ? 'APPLY' : 'DRY-RUN'}) ===`);
  let query = supa.from(table).select(`id, slug, ${column}`).not(column, 'is', null);
  if (slugArg) query = query.eq('slug', slugArg);
  const { data, error } = await query;
  if (error) {
    console.error(`  ERR: ${error.message}`);
    return;
  }
  if (!data) {
    console.log('  (no rows)');
    return;
  }

  let touched = 0;
  let totalRemoved = 0;
  for (const row of data as Array<{ id: number; slug: string } & Record<string, string | null>>) {
    const original = row[column] as string | null;
    if (!original) continue;
    const cleaned = sanitizeCmsContent(original);
    if (cleaned === original) continue;

    const beforeP = (original.match(/<p[^>]*>/gi) || []).length;
    const afterP = (cleaned.match(/<p[^>]*>/gi) || []).length;
    const removed = beforeP - afterP;
    totalRemoved += removed;
    touched += 1;

    console.log(
      `  [${row.id}] ${row.slug}: <p> ${beforeP} -> ${afterP} (-${removed})`,
    );

    if (apply) {
      const { error: upErr } = await supa
        .from(table)
        .update({ [column]: cleaned, updated_at: new Date().toISOString() })
        .eq('id', row.id);
      if (upErr) console.error(`    WRITE ERR: ${upErr.message}`);
    }
  }

  console.log(`  touched=${touched} paragraphs_removed=${totalRemoved}`);
}

async function main() {
  await cleanTable('levees_de_fonds', 'content_html');
  await cleanTable('blog_posts', 'content_html');
  if (!apply) console.log('\nRe-run with --apply to write changes.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

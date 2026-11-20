// Copies POST.json (the X post's address) from the repo to the output dir. Offline, no clock: same bytes every run.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const src = join(process.env.MAKEFUN_BOT_DIR ?? '/bot', 'POST.json');
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const bytes = readFileSync(src);
// The gate's post_file rule: a JSON object of at most 16384 bytes. Fail here, loudly, rather than ship an invalid entry.
let post: unknown;
try {
  post = JSON.parse(bytes.toString('utf8'));
} catch (err) {
  console.error(`POST.json is not JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (bytes.length > 16384 || typeof post !== 'object' || post === null || Array.isArray(post)) {
  console.error('POST.json must be a JSON object of at most 16384 bytes, like {"url": "https://x.com/<handle>/status/<id>"}');
  process.exit(1);
}

mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'POST.json'), bytes);

#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// strip-comments.mjs — 發佈前 HTML 註解剝離 + 保密洩漏掃描
//
// 為什麼需要：article/ 每篇檔頭都有導引 HTML 註解，內含「為什麼要遮」這種
// 二階保密資訊（比數字本身更傷）。HTML 註解在多數 Markdown 渲染下不顯示，
// 但只要一次貼到會顯示原始碼的平台、或讀者檢視頁面原始碼，就是實質外洩。
// 這支腳本把註解剝乾淨、輸出到獨立的 publish/，來源 article/ 仍保留導引註解。
//
// 用法：
//   node scripts/strip-comments.mjs            # 剝離全部 article/*.md → publish/
//   node scripts/strip-comments.mjs D29        # 只處理單篇（D29 或 D29.md 皆可）
//   node scripts/strip-comments.mjs --check     # 只掃描、不輸出（乾跑）
//
// 輸出：publish/Dxx.md（已剝離），並在終端印出每篇移除的註解數 + 保密掃描結果。
// 退出碼：掃到疑似洩漏或殘留註解時回傳 1（可接進 CI / pre-publish 卡關）。
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SRC_DIR = join(ROOT, 'article');
const OUT_DIR = join(ROOT, 'publish');

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const only = args.find((a) => !a.startsWith('--'));

// 保密掃描規則：機器抓得到的高風險 pattern（人工檢查表見檔尾）。
// 抓到不等於一定洩漏，是「請人再看一眼」的提示。
const LEAK_RULES = [
  { name: 'Email 地址',        re: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi },
  { name: '台灣公司網域',      re: /\b[a-z0-9-]+\.com\.tw\b/gi },
  // 只抓殘留的「開頭」<!--：代表有註解沒被閉合、逃過剝離。
  // 不抓 -->,因為 mermaid 圖(A --> B)與行文都會用到,會誤報。
  { name: '殘留未閉合註解',    re: /<!--/g },
  // 長英數 token,再用 keep() 過濾成「同時含數字與字母」才算疑似序號,
  // 否則像 CONCURRENCY 這種純大寫英文單字會誤報。
  { name: '疑似序號(長英數)',  re: /\b[A-Z0-9][A-Z0-9-]{9,}\b/g,
    keep: (t) => /[0-9]/.test(t) && /[A-Z]/.test(t) },
];

// 人工檢查表（機器抓不準、需肉眼確認的項目）
const MANUAL_CHECKLIST = [
  '公司名 / 字號（一律不具名，絕對紅線）',
  '三系統上線日期（不揭露）',
  '截圖裡殘留的：寄件網域、簽名檔、客戶名、專案代號、序號',
  '可反推公司規模的量級數字',
  '真實 SKU / 報價 / 折扣 / 專案價',
];

function stripComments(md) {
  const before = (md.match(/<!--[\s\S]*?-->/g) || []).length;
  let out = md.replace(/<!--[\s\S]*?-->/g, '');
  out = out.replace(/^\s+/, '');          // 檔首殘留空白
  out = out.replace(/\n{3,}/g, '\n\n');   // 連續空行收斂為最多一行
  out = out.replace(/[ \t]+$/gm, '');     // 行尾空白
  if (!out.endsWith('\n')) out += '\n';
  return { out, removed: before };
}

function scanLeaks(text) {
  const hits = [];
  for (const rule of LEAK_RULES) {
    let found = [...new Set(text.match(rule.re) || [])];
    if (rule.keep) found = found.filter(rule.keep);
    if (found.length) hits.push({ rule: rule.name, samples: found.slice(0, 5) });
  }
  return hits;
}

function pickFiles() {
  const all = readdirSync(SRC_DIR).filter((f) => /^D\d+\.md$/.test(f));
  if (!only) return all;
  const want = basename(only).replace(/\.md$/i, '') + '.md';
  return all.filter((f) => f.toLowerCase() === want.toLowerCase());
}

const files = pickFiles();
if (files.length === 0) {
  console.error(`找不到符合的檔案${only ? `：${only}` : ''}`);
  process.exit(1);
}
if (!checkOnly && !existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

let anyLeak = false;
console.log(`\n剝離 ${files.length} 篇（來源 article/ 不變${checkOnly ? '；--check 乾跑，不輸出' : `，輸出 → publish/`}）\n`);

for (const f of files.sort()) {
  const src = readFileSync(join(SRC_DIR, f), 'utf8');
  const { out, removed } = stripComments(src);
  const leaks = scanLeaks(out); // 掃「剝離後」的內文——真正會發佈的東西
  if (!checkOnly) writeFileSync(join(OUT_DIR, f), out, 'utf8');

  const tag = leaks.length ? '⚠️ ' : '✅ ';
  console.log(`${tag}${f}  移除註解 ${removed} 段  → ${out.length} 字`);
  for (const l of leaks) {
    anyLeak = true;
    console.log(`     ⚠️ ${l.rule}：${l.samples.join(', ')}`);
  }
}

console.log('\n── 發佈前人工檢查表（機器抓不準，請肉眼確認）──');
for (const item of MANUAL_CHECKLIST) console.log(`  [ ] ${item}`);
console.log('');

if (anyLeak) {
  console.log('❌ 掃到疑似洩漏或殘留註解——請逐條確認後再發佈。\n');
  process.exit(1);
}
console.log('✅ 自動掃描未發現高風險 pattern（人工檢查表仍須逐項過）。\n');

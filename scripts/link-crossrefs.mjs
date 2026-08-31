#!/usr/bin/env node
/**
 * 把 article/*.md 裡的跨篇索引(D6、D19、D14–18…)轉成 iThome 文章連結。
 *
 * 規則:
 *  - 跳過:程式碼圍欄、行內 code、既有 Markdown 連結/圖片(含 alt text 與 URL)、裸 URL。
 *  - 範圍寫法(D14–18 / D19–D21)整段連到「起始篇」。
 *  - 自我指涉(D19.md 裡的 D19)維持純文字,不連自己。
 *  - 單次掃描,不會把已插入的連結再包一層。
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const URLS = JSON.parse(readFileSync("scripts/ithome-urls.json", "utf8"));
const ART_DIR = "article";

// 範圍寫法排在單篇之前,交替順序即優先序
const REF = /\bD(\d{1,2})\s*[–—-]\s*D?\d{1,2}\b|\bD(\d{1,2})\b/g;
// 受保護片段:圖片 / 連結 / 行內 code / 裸 URL
const PROTECTED = /(!?\[[^\]\n]*\]\([^)\n]*\)|`[^`\n]+`|https?:\/\/\S+)/g;

function linkify(text, selfDay) {
  return text.replace(REF, (m, start, single) => {
    const day = Number(start ?? single);
    const url = URLS[String(day)];
    return !url || day === selfDay ? m : `[${m}](${url})`;
  });
}

function processLine(line, selfDay) {
  let out = "";
  let last = 0;
  for (const m of line.matchAll(PROTECTED)) {
    out += linkify(line.slice(last, m.index), selfDay) + m[0];
    last = m.index + m[0].length;
  }
  return out + linkify(line.slice(last), selfDay);
}

let totalLinks = 0;
for (const file of readdirSync(ART_DIR).filter((f) => /^D\d{2}\.md$/.test(f))) {
  const selfDay = Number(file.slice(1, 3));
  const path = join(ART_DIR, file);
  const lines = readFileSync(path, "utf8").split("\n");
  let inFence = false;
  const next = lines.map((line) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      return line;
    }
    return inFence ? line : processLine(line, selfDay);
  });
  const text = next.join("\n");
  const added = (text.match(/\]\(https:\/\/ithelp\.ithome\.com\.tw\/articles\//g) || []).length;
  totalLinks += added;
  writeFileSync(path, text, "utf8");
  console.log(`${file}\t+${added}`);
}
console.log(`total\t${totalLinks}`);

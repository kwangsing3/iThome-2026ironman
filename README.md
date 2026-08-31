# 讓 AI 去扛人類守不住的戰場，而不是取代人

> 系統整合商 AI 導入實戰(2026)｜ iThome 鐵人賽 2026 · 生成式 AI 組 · 30 篇完賽
>
> **📖 系列文章(iThome 原文)**:<https://ithelp.ithome.com.tw/users/20183104/ironman/9060>

這個儲存庫是這一季 30 篇文章的原始 Markdown 稿與圖片素材。每篇的正式版都發佈在 iThome，下方索引可直接點進原文;`article/` 底下是對應的原稿。

## 這一季在講什麼?

AI 不是來取代人的,它是去負責人類到不了的疆域——**規模、速度、不間斷**;人留在扛責任的位置,而 AI 的工作是**讓這份責任扛得動**。

整季由三個真實上線、有實際使用與效益的系統撐著,不是紙上談兵:

| 系統 | 它接手的是哪一片人守不住的疆域 | 對應篇章 |
| --- | --- | --- |
| **設備運作分析** | 一份約 28K 行的設備狀態檔,人讀不完、也看不懂 | Day 19–21 |
| **每日 CVE 通報** | 全球每天新增的漏洞,沒有人讀得完、又必須在時效內追上 | Day 22–24 |
| **向原廠下單系統(CCW)** | 型號 × 相容 × 折扣的組合爆炸,人工湊不完一張正確報價單 | Day 25–27 |

三幕結構:**幕一 認知/拆解敘事**(Day 1–6,對 AI)→ **幕二 導入為何失敗 + 職場倫理**(Day 7–13,對人與組織)→ **幕三 做給你看/實作**(Day 14–30)。

## 三條閱讀路線

- 🟢 **新手線**:Day 1、2、3、5、6、7、**14–18**、30 —— 先看清 AI 是什麼、限制在哪,再用基礎應用五篇從 0 開始動手(tool call、MCP、記憶、工具分派、任務拆解與成本追蹤)。
- 🟠 **決策者線**:Day 2、5、10–13、28–30 —— 為什麼多數企業導入最後只剩口號、沒職權怎麼推、值不值得投、權限該給到哪。
- 🔵 **工程師線**:Day 6、7、14–27、29 —— 從「AI 為什麼不可靠」開始,一路走完基礎應用與三系統實作。

## 全 30 篇索引

| iThome 原文 | 標題 | 原稿 |
| --- | --- | --- |
| [Day 01](https://ithelp.ithome.com.tw/articles/10400825) | AI 不取代你，而是去負責人類守不住的戰場——這系列要證明什麼 | [D01.md](article/D01.md) |
| [Day 02](https://ithelp.ithome.com.tw/articles/10400982) | AI 之於你會是什麼：去除華爾街記者、媒體與企業CEO敘事後，它究竟是什麼 | [D02.md](article/D02.md) |
| [Day 03](https://ithelp.ithome.com.tw/articles/10401166) | 「人類不可及」是哪些事？規模、速度、不間斷——系統整合商 AI 的真正戰場 | [D03.md](article/D03.md) |
| [Day 04](https://ithelp.ithome.com.tw/articles/10401424) | 系統整合實際撞到的規模牆：型號、漏洞、設備數的組合爆炸 | [D04.md](article/D04.md) |
| [Day 05](https://ithelp.ithome.com.tw/articles/10401627) | 把 AI 寫進系統前，先摸清它的四道限制：context window、prompt、法規、模型聰明度 | [D05.md](article/D05.md) |
| [Day 06](https://ithelp.ithome.com.tw/articles/10401734) | 為什麼 AI 不可靠？我給你一個有趣的實際例子（WEBEX）——用提示逼 AI 做更深的研究 | [D06.md](article/D06.md) |
| [Day 07](https://ithelp.ithome.com.tw/articles/10401848) | 一件事該給 AI 還是留給人?可逆、可查證、誰扛責——三個問題，把同事既有的工作一起考慮進去 | [D07.md](article/D07.md) |
| [Day 08](https://ithelp.ithome.com.tw/articles/10402082) | 導入 AI 最難的不是技術，是人:同事抗拒的三個真實理由——威脅感、改變不安、無力想像 | [D08.md](article/D08.md) |
| [Day 09](https://ithelp.ithome.com.tw/articles/10402180) | 怎麼讓抗拒的同事開始願意用 AI?不是把道理講得更用力——自願者、參與設計、看得到的好處 | [D09.md](article/D09.md) |
| [Day 10](https://ithelp.ithome.com.tw/articles/10402295) | 為什麼企業的 AI 導入最後都變成口號? 喊的人有獎勵，接的人要空手扛 | [D10.md](article/D10.md) |
| [Day 11](https://ithelp.ithome.com.tw/articles/10402461) | 誰該在公司裡推動 AI 導入?六個條件的交集，比你想的小很多 | [D11.md](article/D11.md) |
| [Day 12](https://ithelp.ithome.com.tw/articles/10402580) | 第一步棋不是挑最難的: 為什麼「最重要」都要別人先讓出東西 | [D12.md](article/D12.md) |
| [Day 13](https://ithelp.ithome.com.tw/articles/10402728) | AB 平行導入: 不做第二套系統，讓 AI 長在既有系統旁邊——不打掉重練，也不架空任何人 | [D13.md](article/D13.md) |
| [Day 14](https://ithelp.ithome.com.tw/articles/10402885) | 【AI 基礎應用 ①】從 0 開始：用 Azure AI Foundry 入門 AI 開發 + 第一個 tool call | [D14.md](article/D14.md) |
| [Day 15](https://ithelp.ithome.com.tw/articles/10403118) | 【AI 基礎應用 ②】MCP(Model Context Protocol):自己產一個 MCP 工具，把工具標準化 | [D15.md](article/D15.md) |
| [Day 16](https://ithelp.ithome.com.tw/articles/10403243) | 【AI 基礎應用 ③】AI 記憶的原理與實作：memory + tool_call 示範、Azure Redis 存工作階段 | [D16.md](article/D16.md) |
| [Day 17](https://ithelp.ithome.com.tw/articles/10403407) | 【AI 基礎應用 ④】分裂操作(上)·多工具的 tool routing: 十幾個工具，怎麼讓 AI 自己挑對、只帶必要脈絡、換對口吻 | [D17.md](article/D17.md) |
| [Day 18](https://ithelp.ithome.com.tw/articles/10403639) | 【AI 基礎應用 ④】分裂操作(下)·任務拆解 + 成本追蹤:一個任務拆成幾十次呼叫，怎麼分頭做、又算得清帳 | [D18.md](article/D18.md) |
| [Day 19](https://ithelp.ithome.com.tw/articles/10403790) | 【設備分析 ①】定期巡檢的極限：一台設備的完整狀態，人為什麼看不完、也看不懂？ | [D19.md](article/D19.md) |
| [Day 20](https://ithelp.ithome.com.tw/articles/10404021) | 【設備分析 ②】實作:一份 28K 行的設備狀態檔,怎麼被拆成規模化的多階段分析——事實靠程式、判讀靠 AI | [D20.md](article/D20.md) |
| [Day 21](https://ithelp.ithome.com.tw/articles/10404120) | 【設備分析 ③】後續實際引用: 一個「人做不到」的能力上線後，被拿去做了什麼? | [D21.md](article/D21.md) |
| [Day 22](https://ithelp.ithome.com.tw/articles/10404400) | 【CVE 通報 ①】沒人能每天讀完全球漏洞：規模與時效的人力極限 | [D22.md](article/D22.md) |
| [Day 23](https://ithelp.ithome.com.tw/articles/10404601) | 【CVE 通報 ②】實作:把全球 CVE 洪流，用 LLM 生成看得懂的每日通報——事實靠程式、行文靠 AI | [D23.md](article/D23.md) |
| [Day 24](https://ithelp.ithome.com.tw/articles/10404771) | 【CVE 通報 ③】後續實際引用: 一份每日漏洞通報，怎麼變成客戶資安認證的一環? | [D24.md](article/D24.md) |
| [Day 25](https://ithelp.ithome.com.tw/articles/10405044) | 【向原廠下單系統 ①】人工組報價單的規模極限:型號 × 相容 × 折扣的組合爆炸 | [D25.md](article/D25.md) |
| [Day 26](https://ithelp.ithome.com.tw/articles/10405207) | 【向原廠下單系統 ②】實作:用 CCW GraphQL introspection 自己問出 schema + 向量檢索 16 萬組型號 | [D26.md](article/D26.md) |
| [Day 27](https://ithelp.ithome.com.tw/articles/10405470) | 【向原廠下單系統 ③】後續實際引用: 一份本來就有人做的工作，AI 接手後，那個業務被取代了嗎? | [D27.md](article/D27.md) |
| [Day 28](https://ithelp.ithome.com.tw/articles/10405651) | 這套 AI 值不值得導入?——給決策者的判斷基準(老闆不會問你用 GPT-5 還是 Claude) | [D28.md](article/D28.md) |
| [Day 29](https://ithelp.ithome.com.tw/articles/10405912) | 導入 AI 的責任與邊界: AI 能拿多大的權、出事誰扛，以及當新系統開始吃掉舊場景時，怎麼不讓舊團隊被架空 | [D29.md](article/D29.md) |
| [Day 30](https://ithelp.ithome.com.tw/articles/10406030) | 完賽:AI 沒取代你，它去扛了人守不住的戰場——這系列證明了什麼，然後把價值交到你手上 | [D30.md](article/D30.md) |

## 儲存庫結構

| 路徑 | 內容 |
| --- | --- |
| `article/` | 30 篇文章原稿(`D01.md`–`D30.md`),跨篇索引已連到 iThome 原文 |
| `docs/` | 各篇的截圖與圖表素材,依 `D<n>/` 分目錄 |
| `scripts/` | 稿件維護工具:`strip-comments.mjs`(剝離寫作導引註解)、`link-crossrefs.mjs`(跨篇索引轉 iThome 連結) |
| `CLAUDE.md` | 全季規劃與寫作守則(敘事四拍、保密紅線、逐日排程) |
| `GLOSSARY.md` | 系列統一用語 |

## 關於文中的案例與數據

文中所有企業案例一律**不具名**(寫「某系統整合商」),不揭露系統上線日期,效益數據與截圖全部去識別化——不出現真實客戶名、設備清單、IP、拓樸、SKU 與報價明細。

## 授權

文章內容版權為作者所有;程式碼片段僅作教學示範之用。

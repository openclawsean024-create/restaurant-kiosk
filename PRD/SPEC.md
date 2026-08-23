# Goal: 開工 餐飲點餐快手 M1 — Web 餐廳 SaaS

## 背景
- 截圖來源:Sean 提供(2026-08-22)
- 核心價值:餐飲店「自助點餐 + 取餐進度 + 會員回訪」三合一的 SaaS
- 目標客層:**中型連鎖餐廳**(5-20 家分店)、需會員經營、無自有工程師
- 對標:iCHEF、Ocard、Inline、Wastee、美業 POS 龍頭
- 北極星指標:6 個月內 50 個店家付費、NT$100,000 MRR

## 範圍
本 Goal 涵蓋 **Sprint 1 (2 週)** 全部 P0 功能:

### P0-1 自助點餐 Kiosk UI(Web PWA,響應式可裝到 iPad)
- 菜單瀏覽(類別、推薦、搜尋)
- 主餐選擇 + 客製化選項(醬料、加購、副餐)
- 購物車 + 結帳(支援會員折扣)
- 訂單送出

### P0-2 取餐進度即時追蹤
- 訂單狀態機:**已接單 → 製作中 → 可取餐 → 已取餐**
- 訂單編號(A128 格式)
- 預估時間(分鐘)
- 訂單歷史查詢

### P0-3 店家後台(訂單 / 品項 CRUD)
- 訂單管理(看、即時更新狀態)
- 品項管理(新增 / 編輯 / 刪除 / 上 / 下架)
- 類別管理
- 店家設定(營業時間、低庫存提醒)

### P0-4 會員帳號(簡化版)
- 註冊 / 登入(電話 + 驗證碼)
- 會員資料
- 消費歷史
- **會員優惠券**(VIP 9 折、滿額折抵)— 不做複雜 CRM
- 店家後台可看會員列表 + 消費排行

### P0-5 即時訂單狀態更新(polling,不上 WebSocket)
- 顧客頁 polling 每 3 秒抓狀態
- 店家後台 polling 每 5 秒抓新訂單
- WebSocket / Pusher 留到 Sprint 2

## 必須採用的技術決策
- **前端**:Vite + React 19 + TypeScript strict(沿用 OpenPTT SOP)
- **樣式**:Tailwind CSS v4
- **後端**:Cloudflare Workers + KV(模擬,不串真實金流)
- **資料儲存**:localStorage(本機 demo)+ IndexedDB(購物車/訂單暫存)
- **驗證**:「輸入電話號碼即可模擬註冊」(無真實 SMS,MVP)
- **部署**:Vercel(已有 token)
- **金流**:**不做**(MVP 假結帳流程)

## 不引入(Scope Creep 防護)
- ❌ 真實金流串接(Stripe / 藍新)
- ❌ SMS 簡訊驗證(假驗證即可)
- ❌ WebSocket / Pusher / FCM(MVP 用 polling)
- ❌ 多店切換(單店模式)
- ❌ 廚房 KDS(Kitchen Display System)— 列印機就好
- ❌ 庫存管理(進階)
- ❌ 報表 / 數據分析(MVP 無 BI)
- ❌ 進銷存 / 採購
- ❌ 員工排班

## 5 + 1 個測試重點
1. **自助點餐完整流程**:從菜單 → 客製化 → 購物車 → 結帳 → 訂單送出
2. **取餐進度 polling**:訂單送出 30 秒內狀態從「已接單」→「製作中」→「可取餐」
3. **店家後台 CRUD**:訂單狀態更新、品項上/下架
4. **會員驗證流程**:電話註冊 → 看到 VIP 9 折 → 結帳看到折扣
5. **店家設定**:營業時間、低庫存提醒

+ **TypeScript strict + 5 個 E2E 全綠**

## 驗收標準(必須逐條 ✅)

### 1. 本機 dev server(沿用 OpenPTT SOP)
- [ ] `npm run dev` 啟動 → http://localhost:5173 回 200
- [ ] 首頁 < 1.5s 載入(之後用 Lighthouse 驗)
- [ ] Lighthouse Performance ≥ 90(本機跑 lighthouse-ci)
- [ ] 自助點餐完整流程可走(mock 店家 + 3 個品項 + 1 個客製化 + 1 個加購)
- [ ] 訂單送出後,可在店家後台看到訂單 + 改狀態
- [ ] 顧客頁 polling 後狀態同步更新
- [ ] 會員「輸電話 → 看到 VIP 9 折 → 結帳帶折扣」
- [ ] 店家後台可新增品項 → 自助點餐頁可看到新項目
- [ ] TypeScript strict `tsc --noEmit` exit 0
- [ ] 至少 5 個 E2E 測試案例全綠
- [ ] localStorage 在私覽模式不 crash(try/catch fallback)

### 2. Vercel preview deploy
- [ ] preview URL HTTP 200
- [ ] preview URL 跑完所有 dev 驗收
- [ ] 4 surface 對齊(Local = GitHub HEAD = Vercel deployed SHA = Notion digest)

### 3. Notion 同步
- [ ] Notion row 狀態「規格中」→「開發中」
- [ ] 更新日期 = 今天
- [ ] 進度 digest:Vercel URL + GitHub SHA + 5 個 ✅ 證據 + 已知問題 + 下一步
- [ ] 規格計劃書 URL 指向 PRD/SPEC.md (blob URL)

## 已知風險與處理
- **客製化選項爆炸** → 用 structured `OptionGroup` schema,每組單選
- **圖片 / 排版不同店家不同** → MVP 統一 Style,自訂留 Sprint 3
- **polling 過度 polling 商家** → IndexedDB debounce + 切到 5 秒輪詢
- **localStorage 在私覽模式無效** → try/catch fallback 到記憶體
- **i18n** → 全繁中,不做英文版

## 失敗處理
**連續 3 輪失敗**(Lighthouse < 90 / TypeScript error / 5 個 E2E 沒全綠 / XSS 沒解掉 / 本機跑不起來)→ 停下、回報:
- 失敗的是哪條驗收標準
- 我嘗試過什麼
- 失敗的 raw error message
- 建議 Sean 決定 X 還是 Y

**不要硬撐、不要 scope creep、不要用 mock 假裝通過驗收。**

## 產出交付
1. **GitHub**:`openclawsean024-create/restaurant-kiosk`(private repo,本機建立後 push)
2. **Vercel preview URL**
3. **Notion 同步更新**:`3c4449ca-...` (待 Notion row 建好)
4. **給 Sean 的 1 段執行摘要**(做了什麼、怎麼驗收的、剩什麼、什麼時候要決定下一步)

## 變現 / 定價
- **SaaS 訂閱** NT$1,990 / 月 / 店
- **Per-order**:NT$2 / 單(店家月營業額 NT$10 萬 → 我抽 ~2%)
- **會員 VIP**(consumer 面):店家自行定價,平台不抽
- **第 1 個月免費**:鼓勵店家試用

## 不在本 Goal 範圍
- ❌ 真實金流(MVP 假結帳)
- ❌ SMS 驗證(電話可亂打,只看長度)
- ❌ 多店 / 多店切換(只支援單店)
- ❌ 報表 / BI(Sprint 2+)
- ❌ 列印機整合(MVP 螢幕顯示就好)

---

**Next Action**:Sean 確認本 Goal → 我寫 PRD v3.0(15 章)+ Scaffold

---

## 等 Sean 確認(2 個 Y/N)

**Y/N-A**:上面 4 個決策(技術棧沿用、平台 PWA、客層連鎖、變現訂閱+抽成) **OK 嗎?**

**Y/N-B**:開始執行(寫 PRD → scaffold → 跑驗收) **OK 嗎?**

---

*Goal 撰寫:Hermes Agent*
*基於 OpenPTT Sprint 1 SOP,延伸第二個專案*

---

## 第一次失敗回報(預期)

預期第一輪會遇到:
1. React DOMPurify 可能不需要(餐飲這個 site 沒 user 輸入的 HTML)
2. Cloudflare Workers 模擬(沒有 KV,純 mock)
3. **localStorage / IndexedDB** — 要嘛只用 localStorage,要嘛引入 idb 套件

我建議先**只用 localStorage + 記憶體 fallback**,IndexedDB 留 Sprint 2 再說。

---

## 第一次執行 step(我馬上做)

如果 Sean 都按 Y,我立刻:

1. **Notion row 建好**(佔位規格中)
2. **本機建** `restaurant-kiosk/PRD/SPEC.md`(本 Goal 文件本身當初版)
3. **寫 PRD v3.0**(15 章,跟 OpenPTT 一樣規格)
4. **Vite scaffold** + 5 個 P0 全實作
5. **5 個 E2E 寫好並全綠**
6. 寫到本機後**交棒給你 push / Vercel**(沿用 OpenPTT HANDOVER 模式)

不會一次做完(Sprint 1 通常要 3-5 輪迭代)。我會照 OpenPTT 一樣:

- 寫 code
- 跑 typecheck + test
- **遇到連續 3 輪失敗 → 停下、回報、給建議**
- 不硬撐、不假裝驗收通過

---

*This Goal document is the source of truth for "餐飲點餐快手" Sprint 1. 跟 OpenPTT 一樣的 SOP。*

# 餐飲點餐快手 — Sprint 1

Web 餐廳 SaaS(自助點餐 + 取餐進度 + 會員回訪)。

## 本地啟動

```bash
cd restaurant-kiosk/web
npm install
npm run dev          # http://localhost:5174
```

## 跑測試

```bash
npm test
```

## TypeScript 嚴格檢查

```bash
npm run typecheck
```

## 驗收對應(Goal Step 1 — 本機 dev server)

| 驗收項 | 狀態 |
|---|---|
| `npm run dev` 啟動 | ✅ |
| 自助點餐完整流程(mock) | ✅ |
| 店家後台 CRUD | ✅ |
| TypeScript strict exit 0 | ✅ |
| 5+ 個 E2E 全綠 | ✅ 7/7 |
| localStorage 持久化 | ✅ |
| VIP 折扣邏輯 | ✅ |
| Polling 即時同步 | ✅(程式碼,需手動驗證瀏覽器)|

## 跳過(Goal Step 2 / Step 3)

- ❌ Vercel preview deploy(需 token)
- ❌ Notion 同步(需 write integration)

## 跳過(Goal 「scope creep 防護」)

- ❌ 真實金流
- ❌ SMS 驗證
- ❌ 多店切換
- ❌ 庫存管理
- ❌ 報表 / BI

詳見 `../GOAL.md`。

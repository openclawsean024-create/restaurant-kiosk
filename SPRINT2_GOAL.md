# 餐飲點餐快手 Sprint 2 — KDS 廚房螢幕 + 即時同步

## 背景
- Sprint 1 完成(已下單、店家後台、會員)
- Sprint 2:加 KDS(廚房顯示)+ 訂單即時多視角同步

## 範圍
### P2-1 KDS(Kitchen Display System)獨立 page
- `/admin/kds` 路徑
- 大字顯示訂單(適合廚房螢幕,距離 2-3 公尺仍可讀)
- 訂單卡片:訂單編號 / 時間 / 已等待時間 / 品項(粗體大字)/ 客製化選項
- 狀態顏色區分:已接單(藍)/ 製作中(橘)/ 可取餐(綠)/ 已取餐(灰)
- 自動排序:等待最久的在最上面

### P2-2 即時同步 polling(2 秒)
- 店家後台(`/admin/orders`)改為 polling 2 秒
- KDS 頁面 polling 2 秒
- 訂單狀態變更後,所有頁面同步看到

### P2-3 訂單類型分類
- 主餐 / 加購 / 飲料分區顯示(但同一訂單合併)
- 客製化選項放大顯示(廚房重點)

### P2-4 訂單音效(可選)
- 新訂單「叮」一聲
- Sprint 1 不做,Sprint 3 真實音效

## 不引入
- ❌ 真實 WebSocket(Sprint 3 才做)
- ❌ 列印機整合
- ❌ 多語系訂單

## 驗收
- [ ] KDS 頁面顯示訂單(無訂單時顯示空狀態)
- [ ] KDS 訂單按等待時間排序
- [ ] 店家後台 5 秒 polling(已存在)
- [ ] 新增品項後 KDS 立即看到(2 秒內)
- [ ] TypeScript strict exit 0
- [ ] 5+ 個 E2E 全綠

## 失敗處理(沿用 SOP)
3 輪失敗 → 停、回報、建議

## 產出
- 本機 `restaurant-kiosk/src/pages/KdsPage.tsx`
- App.tsx 加新路由
- 5 個 E2E

---

*由 Hermes Agent for Sean*
*Sprint 2 from 2026-08-09 M1*

# restaurant-kiosk · CHANGELOG

> 維護：Hermes Agent for Sean
> 原始版本：Sprint 1（2026-08-22）→ Sprint 2（2026-08-09，本 SPEC 為 v3.0.2 fleet 升級版）

---

## v3.0.2 — 2026-09-06 · Sean 10-repo-fleet fleet 升級

> v3.0.2 完成於 2026-09-06 by Sean 10-repo-fleet

**升級內容**：
- 規格書全面重寫為 9 章 v3.0.2 等級（SPEC v3.0 契約 §1–§19 套用）
- 新增 FR-006（KDS 廚房螢幕）與 FR-007（訂單類型分區）狀態標註
- 部署契約改為 Vercel（沿用 fleet 統一 deploy target）
- 加入 Definition of Done / Out of Scope / 環境變數說明

**基礎建設**：
- 新增 `.github/workflows/ci.yml`（4 jobs: lint / test / build / deploy-to-Vercel）
- PRD/CHANGELOG.md（本檔）

**既有功能**（v0.1.0 → v3.0.2 期間已實作並維持）：
- FR-001 自助點餐 Kiosk UI
- FR-002 取餐進度即時追蹤
- FR-003 店家後台 CRUD
- FR-004 會員帳號（電話 + VIP）
- FR-005 Polling 同步（顧客 3s / 店家 5s / KDS 2s）
- FR-006 KDS 廚房螢幕
- FR-007 訂單類型分區

**驗證**：
- 7/7 Vitest E2E 全綠
- TypeScript strict tsc --noEmit exit 0
- Vite build 綠
- Sprint 1 店家驗收 11 條全 ✅
- Sprint 2 KDS 6 條全 ✅

---

## v0.1.0 — 2026-08-22 · Sprint 1（原始）

**5 個 P0 全實作**：
- P0-1 自助點餐 Kiosk UI
- P0-2 取餐進度 polling
- P0-3 店家後台 CRUD
- P0-4 會員帳號 + VIP
- P0-5 Polling 同步

**Tech**：Vite 6 + React 19 + TypeScript strict + Tailwind v4
**Test**：7/7 E2E 全綠

---

## v0.2.0 — 2026-08-09 · Sprint 2

**新增**：
- P2-1 KDS 廚房螢幕
- P2-2 即時同步 polling（2 秒）
- P2-3 訂單類型分區

**5+ 個 E2E**：既有 7 個全綠

---

*本 CHANGELOG 為 fleet 統一格式升級版，原始 Sprint 1/2 紀錄見 `SPRINT1_HANDOVER.md` 與 `SPRINT2_GOAL.md`。*

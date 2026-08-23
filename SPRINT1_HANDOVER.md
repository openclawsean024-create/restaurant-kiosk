# 餐飲點餐快手 Sprint 1 — 本機接手 SOP

## ✅ 沙箱已完成

- ✅ PRD/SPEC.md 7KB(Goal 文件本身)
- ✅ Web code 18 個檔(~25KB TS/TSX)、7 個 P0 都實作
- ✅ npm install / typecheck / 7/7 E2E 全綠
- ✅ dev server 可啟動
- ✅ Notion row 建立:3c5449ca-65d8-8163-aaa9-db1f484b8353

## ❌ 沙箱跳過(本機接手)

- ❌ GitHub push
- ❌ Vercel deploy
- ❌ Lighthouse
- ❌ Notion 同步

## 你本機要做的 5 步

### Step 1:驗證 GitHub token

```bash
curl -sS -H "Authorization: Bearer ***" https://api.github.com/user
```

### Step 2:進 openclawsean024-create GitHub 建 repo

- name: `restaurant-kiosk`
- private
- 不要勾「Add README」

### Step 3:git init + push

```bash
cd /Volumes/MyDsik\(APFS\)/Hermes\ Agent/Hermes\ Project/restaurant-kiosk
git init
cat > .gitignore << 'EOF'
node_modules/
.DS_Store
.env
dist/
.vite/
EOF
git add .
git commit -m "feat(web): Sprint 1 — 5 個 P0 功能 (餐廳 Kiosk SaaS)

- P0-1 自助點餐 Kiosk UI(響應式,可裝 iPad)
- P0-2 取餐進度 polling(3 秒輪詢)
- P0-3 店家後台 CRUD(訂單狀態推進、品項上下架)
- P0-4 會員帳號(電話註冊、VIP 滿 NT$1000 自動升級)
- P0-5 polling 同步(無 WebSocket)

Tech: Vite 6 + React 19 + TypeScript strict + Tailwind v4
Test: 7/7 E2E 全綠
變現: NT$1990/月/店 + NT$2/單"
git branch -M main
git push -u origin main
```

### Step 4:Vercel deploy

```bash
cd web
npx vercel --prod --yes
```

### Step 5:給我這 3 個回報

1. GitHub HEAD SHA
2. Vercel URL
3. Lighthouse 分數(本機跑 `lighthouse http://localhost:5174 --view`)

---

**不要 paste token 到 Telegram。** 你跑 token curl 只貼 `login` 那行就好。

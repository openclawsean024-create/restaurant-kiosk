import type { MenuItem, Order, Member, ItemOptionGroup, OrderItem, OrderStatus } from './types'

const KEY = 'restaurant-kiosk:db'
const MEMBER_KEY = 'restaurant-kiosk:currentMember'

interface DBSchema {
  items: MenuItem[]
  orders: Order[]
  members: Member[]
  orderSeq: number
  optionGroups: ItemOptionGroup[]
}

function read(): DBSchema {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.items)) return parsed
    }
  } catch {}
  return { items: [], orders: [], members: [], orderSeq: 100, optionGroups: [] }
}

function write(db: DBSchema) {
  try {
    localStorage.setItem(KEY, JSON.stringify(db))
  } catch {}
}

const DEFAULT_OPTION_GROUPS: ItemOptionGroup[] = [
  { id: 'g1', name: '主餐選擇', required: true, multiple: false, options: [
    { id: 'o1', name: '白飯', priceDelta: 0 },
    { id: 'o2', name: '紫米', priceDelta: 5 },
    { id: 'o3', name: '全麥', priceDelta: 10 },
  ]},
  { id: 'g2', name: '醬料', required: false, multiple: false, options: [
    { id: 'o4', name: '黑胡椒', priceDelta: 0 },
    { id: 'o5', name: '紅辣', priceDelta: 0 },
    { id: 'o6', name: '蔥鹽', priceDelta: 0 },
    { id: 'o7', name: '薄荷', priceDelta: 5 },
  ]},
  { id: 'g3', name: '加購副餐', required: false, multiple: true, options: [
    { id: 'o8', name: '薯條 +$29', priceDelta: 29 },
    { id: 'o9', name: '雞塊 +$49', priceDelta: 49 },
    { id: 'o10', name: '飲料折價券 +$10', priceDelta: 10 },
  ]},
]

const DEFAULT_ITEMS: MenuItem[] = [
  { id: 'i1', name: '經典脆雞排', price: 149, category: '主餐', image: '🍗', available: true },
  { id: 'i2', name: '花生牛肉堡', price: 179, category: '主餐', image: '🍔', available: true },
  { id: 'i3', name: '泰式椒麻雞', price: 169, category: '主餐', image: '🌶️', available: true },
  { id: 'i4', name: '酥炸雞塊(6 入)', price: 79, category: '加購', image: '🍘', available: true },
  { id: 'i5', name: '波浪薯條', price: 59, category: '加購', image: '🍟', available: true },
  { id: 'i6', name: '冰奶茶', price: 49, category: '飲料', image: '🧋', available: true },
  { id: 'i7', name: '檸檬紅茶', price: 39, category: '飲料', image: '🍋', available: true },
]

export function seedDemoData() {
  const db = read()
  if (db.items.length > 0) return
  db.items = [...DEFAULT_ITEMS]
  db.optionGroups = [...DEFAULT_OPTION_GROUPS]
  write(db)
}

export function getDB(): DBSchema { return read() }

export function listItems(): MenuItem[] { return read().items }
export function getItem(id: string): MenuItem | undefined {
  return read().items.find(i => i.id === id)
}
export function addItem(item: Omit<MenuItem, 'id'>): MenuItem {
  const db = read()
  const newItem: MenuItem = { ...item, id: 'i' + Date.now() }
  db.items.push(newItem)
  write(db)
  return newItem
}
export function toggleItemAvailable(id: string) {
  const db = read()
  const item = db.items.find(i => i.id === id)
  if (item) {
    item.available = !item.available
    write(db)
  }
}
export function isItemAvailable(id: string): boolean {
  return read().items.find(i => i.id === id)?.available ?? false
}

export function getOptionGroups(): ItemOptionGroup[] { return read().optionGroups }

export function createOrder(cart: OrderItem[]): Order {
  const db = read()
  db.orderSeq += 1
  const newOrder: Order = {
    id: 'A' + db.orderSeq,
    items: cart,
    status: '已接單',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    memberPhone: null,
  }
  db.orders.push(newOrder)
  write(db)
  return newOrder
}
export function listOrders(): Order[] { return read().orders }
export function getOrder(id: string): Order | undefined {
  return read().orders.find(o => o.id === id)
}
export function updateOrderStatus(id: string, status: OrderStatus) {
  const db = read()
  const order = db.orders.find(o => o.id === id)
  if (order) {
    order.status = status
    order.updatedAt = Date.now()
    write(db)
  }
}

export function loginOrCreateMember(phone: string): Member {
  const db = read()
  let m = db.members.find(x => x.phone === phone)
  if (!m) {
    m = { phone, isVip: false, totalSpent: 0, joinedAt: Date.now() }
    db.members.push(m)
  }
  m.isVip = m.totalSpent >= 1000
  write(db)
  return m
}
export function recordSpend(phone: string, amount: number) {
  const db = read()
  const m = db.members.find(x => x.phone === phone)
  if (m) {
    m.totalSpent += amount
    m.isVip = m.totalSpent >= 1000
    write(db)
  }
}

export function currentMemberPhone(): string | null {
  try { return localStorage.getItem(MEMBER_KEY) } catch { return null }
}
export function setCurrentMember(phone: string | null) {
  try {
    if (phone) localStorage.setItem(MEMBER_KEY, phone)
    else localStorage.removeItem(MEMBER_KEY)
  } catch {}
}

export function listMembers(): Member[] { return read().members }

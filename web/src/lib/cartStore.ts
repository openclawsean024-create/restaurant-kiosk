import { create } from './createStore'

export interface CartLine {
  uid: string
  itemId: string
  quantity: number
  optionIds: string[]
}

interface CartState {
  lines: CartLine[]
  add: (line: Omit<CartLine, 'uid'>) => void
  remove: (uid: string) => void
  clear: () => void
}

const KEY = 'restaurant-kiosk:cart'

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {}
  return []
}
function persist(lines: CartLine[]) {
  try { localStorage.setItem(KEY, JSON.stringify(lines)) } catch {}
}

export const useCart = create<CartState>((set) => ({
  lines: load(),
  add: (line) => {
    const lines = load()
    lines.push({ ...line, uid: 'l' + Date.now() + Math.random().toString(36).slice(2, 6) })
    persist(lines)
    set({ lines })
  },
  remove: (uid) => {
    const lines = load().filter(l => l.uid !== uid)
    persist(lines)
    set({ lines })
  },
  clear: () => {
    persist([])
    set({ lines: [] })
  },
}))

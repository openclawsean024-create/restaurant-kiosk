import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { listItems } from '../lib/db'
import { useCart } from '../lib/cartStore'

export default function MenuPage() {
  const items = listItems().filter(i => i.available)
  const categories = useMemo(() => Array.from(new Set(items.map(i => i.category))), [items])
  const [active, setActive] = useState(categories[0] ?? '主餐')
  const [search, setSearch] = useState('')
  const cart = useCart(s => s.lines)
  const add = useCart(s => s.add)

  const filtered = items.filter(i =>
    (!search || i.name.includes(search)) && (!active || i.category === active)
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">菜單</h1>
        <Link
          to="/cart"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          data-testid="cart-link"
        >
          🛒 購物車 ({cart.length})
        </Link>
      </div>

      <input
        type="text"
        placeholder="搜尋品項..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-slate-300 rounded"
      />

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-3 py-1 rounded text-sm whitespace-nowrap ${
              active === c ? 'bg-orange-500 text-white' : 'bg-slate-100 hover:bg-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4" data-testid="menu-grid">
        {filtered.map(item => (
          <div key={item.id} className="border border-slate-200 rounded p-4 hover:shadow-md">
            <div className="text-4xl mb-2">{item.image}</div>
            <h3 className="font-medium">{item.name}</h3>
            <div className="text-orange-600 font-bold mb-3">NT$ {item.price}</div>
            <button
              onClick={() => add({ itemId: item.id, quantity: 1, optionIds: [] })}
              className="w-full px-3 py-1.5 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
              data-testid={`add-${item.id}`}
            >
              加入購物車
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-slate-500 py-12" data-testid="empty-menu">沒有符合的品項</div>
      )}
    </div>
  )
}

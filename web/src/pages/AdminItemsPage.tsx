import { useState } from 'react'
import { listItems, toggleItemAvailable, addItem } from '../lib/db'

export default function AdminItemsPage() {
  const items = listItems()
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState(99)
  const [newCategory, setNewCategory] = useState('主餐')
  const [, setTick] = useState(0)
  void setTick

  function refresh() { setTick(t => t + 1) }

  function handleAdd() {
    if (!newName.trim()) return
    addItem({ name: newName.trim(), price: newPrice, category: newCategory, image: '🍱', available: true })
    setNewName('')
    setNewPrice(99)
    refresh()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🏪 品項管理</h1>

      <div className="border border-slate-200 rounded p-4 mb-4">
        <h2 className="font-medium mb-2">新增品項</h2>
        <div className="flex gap-2 items-end flex-wrap">
          <div className="flex-1 min-w-40">
            <label className="text-xs block">名稱</label>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="w-full px-2 py-1 border rounded"
              data-testid="new-item-name"
            />
          </div>
          <div>
            <label className="text-xs block">價格</label>
            <input
              type="number"
              value={newPrice}
              onChange={e => setNewPrice(+e.target.value)}
              className="w-24 px-2 py-1 border rounded"
              data-testid="new-item-price"
            />
          </div>
          <div>
            <label className="text-xs block">類別</label>
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="px-2 py-1 border rounded"
            >
              <option>主餐</option>
              <option>加購</option>
              <option>飲料</option>
            </select>
          </div>
          <button
            onClick={handleAdd}
            className="px-3 py-1 bg-orange-500 text-white rounded text-sm"
            data-testid="add-item"
          >
            新增
          </button>
        </div>
      </div>

      <div className="border border-slate-200 rounded p-4">
        <h2 className="font-medium mb-2">品項列表({items.length})</h2>
        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr><th className="py-1">品項</th><th>類別</th><th>價格</th><th>狀態</th><th></th></tr>
          </thead>
          <tbody data-testid="items-table">
            {items.map(i => (
              <tr key={i.id} className="border-b">
                <td className="py-2">{i.image} {i.name}</td>
                <td>{i.category}</td>
                <td>NT$ {i.price}</td>
                <td>
                  <span
                    className={i.available ? 'text-green-600' : 'text-slate-400'}
                    data-testid={`status-${i.id}`}
                  >
                    {i.available ? '上線' : '下架'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => { toggleItemAvailable(i.id); refresh() }}
                    className="text-orange-600 text-xs hover:underline"
                    data-testid={`toggle-${i.id}`}
                  >
                    {i.available ? '下架' : '上線'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <a href="/admin/orders" className="block mt-6 text-sm text-orange-600 hover:underline">
        ← 回訂單管理
      </a>
    </div>
  )
}

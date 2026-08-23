import { useEffect } from 'react'
import { listOrders, updateOrderStatus, listItems } from '../lib/db'

const NEXT_STATUS: Record<string, '製作中' | '可取餐' | '已取餐'> = {
  '已接單': '製作中',
  '製作中': '可取餐',
  '可取餐': '已取餐',
  '已取餐': '已取餐',
}

export default function AdminOrdersPage() {
  useEffect(() => {
    const id = setInterval(() => { /* poll */ }, 5000)
    return () => clearInterval(id)
  }, [])

  const orders = listOrders().sort((a, b) => b.createdAt - a.createdAt)
  const items = listItems()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🏪 店家後台 — 訂單管理</h1>
      <p className="text-xs text-slate-500 mb-4">每 5 秒 polling 更新(開發示範)</p>

      {orders.length === 0 && (
        <div className="text-center py-12 text-slate-500" data-testid="no-orders">目前沒有訂單</div>
      )}

      <div className="space-y-3" data-testid="admin-orders">
        {orders.map(o => (
          <div key={o.id} className="border border-slate-200 rounded p-3" data-testid={`order-${o.id}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">訂單 {o.id}</span>
              <span className="text-xs text-slate-500">{new Date(o.createdAt).toLocaleTimeString('zh-Hant')}</span>
            </div>
            <div className="text-sm mb-2">
              {o.items.map((line, idx) => {
                const item = items.find(i => i.id === line.itemId)
                return <span key={idx} className="mr-3">{item?.image} {item?.name} x{line.quantity}</span>
              })}
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm px-2 py-1 rounded ${
                o.status === '已取餐' ? 'bg-slate-200' :
                o.status === '可取餐' ? 'bg-green-100 text-green-700' :
                o.status === '製作中' ? 'bg-amber-100 text-amber-700' :
                'bg-blue-100 text-blue-700'
              }`} data-testid={`status-${o.id}`}>{o.status}</span>
              {o.status !== '已取餐' && (
                <button
                  onClick={() => updateOrderStatus(o.id, NEXT_STATUS[o.status])}
                  className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                  data-testid={`advance-${o.id}`}
                >
                  推進 → {NEXT_STATUS[o.status]}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <a href="/admin/items" className="block mt-6 text-sm text-orange-600 hover:underline">
        → 品項管理(上 / 下架、編輯)
      </a>
    </div>
  )
}

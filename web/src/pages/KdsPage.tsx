import { useEffect, useState } from 'react'
import { listOrders, listItems, updateOrderStatus } from '../lib/db'
import type { Order } from '../lib/types'

const NEXT_STATUS: Record<Order['status'], Order['status']> = {
  '已接單': '製作中',
  '製作中': '可取餐',
  '可取餐': '已取餐',
  '已取餐': '已取餐',
}

const STATUS_COLOR: Record<Order['status'], string> = {
  '已接單': 'border-blue-500 bg-blue-50',
  '製作中': 'border-amber-500 bg-amber-50',
  '可取餐': 'border-green-500 bg-green-100',
  '已取餐': 'border-slate-300 bg-slate-100 opacity-50',
}

function elapsed(ms: number): string {
  const min = Math.floor((Date.now() - ms) / 60000)
  if (min < 1) return '剛剛'
  if (min < 60) return `${min} 分鐘前`
  return `${Math.floor(min / 60)} 小時 ${min % 60} 分前`
}

export default function KdsPage() {
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(id)
  }, [])

  const allOrders = listOrders().filter(o => o.status !== '已取餐')
  const sorted = [...allOrders].sort((a, b) => a.createdAt - b.createdAt)
  const items = listItems()

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">👨‍🍳 廚房顯示系統(KDS)</h1>
        <div className="text-sm text-slate-500" data-testid="kds-stats">
          待製作 {sorted.length} 單 · 每 2 秒更新
        </div>
      </div>

      {sorted.length === 0 && (
        <div className="text-center text-slate-400 py-20 text-xl" data-testid="kds-empty">
          目前沒有待製作訂單
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" data-testid="kds-grid">
        {sorted.map(o => (
          <div
            key={o.id}
            data-testid={`kds-order-${o.id}`}
            className={`border-l-8 ${STATUS_COLOR[o.status]} rounded-lg p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-black">{o.id}</span>
              <span className="text-sm font-bold" data-testid={`kds-elapsed-${o.id}`}>
                ⏱ {elapsed(o.createdAt)}
              </span>
            </div>

            <div className="space-y-1.5 mb-3">
              {o.items.map((line, idx) => {
                const item = items.find(i => i.id === line.itemId)
                if (!item) return null
                return (
                  <div key={idx} className="font-bold text-xl" data-testid={`kds-item-${o.id}-${idx}`}>
                    <span className="mr-2">{item.image}</span>
                    {item.name}
                    <span className="ml-2 text-orange-600">x{line.quantity}</span>
                  </div>
                )
              })}
            </div>

            <div className="text-xs text-slate-600 mb-3 space-y-0.5">
              {o.items.map((line, idx) => {
                if (line.optionIds.length === 0) return null
                return (
                  <div key={idx}>• {line.optionIds.join(' / ')}</div>
                )
              })}
            </div>

            <button
              onClick={() => {
                updateOrderStatus(o.id, NEXT_STATUS[o.status])
                setTick(t => t + 1)
              }}
              disabled={o.status === '可取餐'}
              className="w-full px-3 py-2 bg-orange-500 text-white rounded font-bold text-lg hover:bg-orange-600 disabled:bg-slate-300"
              data-testid={`kds-advance-${o.id}`}
            >
              {o.status === '可取餐' ? '已可取餐 →' : `推進 → ${NEXT_STATUS[o.status]}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

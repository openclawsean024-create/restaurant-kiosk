import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrder, listItems, updateOrderStatus } from '../lib/db'

const STATUSES: Array<{ key: '已接單' | '製作中' | '可取餐' | '已取餐'; label: string }> = [
  { key: '已接單', label: '已接單' },
  { key: '製作中', label: '製作中' },
  { key: '可取餐', label: '可取餐' },
  { key: '已取餐', label: '已取餐' },
]

export default function OrderStatusPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000)
    return () => clearInterval(id)
  }, [])

  if (!orderId) return <div>訂單不存在</div>
  const order = getOrder(orderId)
  if (!order) return <div data-testid="order-not-found">訂單 {orderId} 找不到</div>

  // demo 自動推進(模擬店家後台)
  useEffect(() => {
    const age = Date.now() - order.createdAt
    if (age > 30000 && order.status === '已接單') updateOrderStatus(order.id, '製作中')
    if (age > 60000 && order.status === '製作中') updateOrderStatus(order.id, '可取餐')
  }, [tick, order.id, order.status, order.createdAt])

  const items = listItems()
  const currentIdx = STATUSES.findIndex(s => s.key === order.status)
  const refreshedOrder = getOrder(orderId) || order

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📋 訂單 {refreshedOrder.id}</h1>

      <div className="border border-slate-200 rounded p-4 mb-4">
        <div className="flex justify-between mb-2">
          <h2 className="font-medium">製作進度</h2>
          <span className="text-xs text-slate-500">每 3 秒自動更新</span>
        </div>
        <div className="flex gap-2 overflow-x-auto" data-testid="status-bar">
          {STATUSES.map((s, i) => (
            <div
              key={s.key}
              className={`flex-1 min-w-20 px-3 py-2 rounded text-center text-sm ${
                i <= currentIdx ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      <div className="border border-slate-200 rounded p-4">
        <h2 className="font-medium mb-2">訂單內容</h2>
        {refreshedOrder.items.map((line, idx) => {
          const item = items.find(i => i.id === line.itemId)
          return (
            <div key={idx} className="text-sm border-b last:border-b-0 py-2">
              {item?.image} {item?.name} x {line.quantity}
            </div>
          )
        })}
        <div className="mt-3 text-xs text-slate-500">
          建立:{new Date(refreshedOrder.createdAt).toLocaleString('zh-Hant')}
        </div>
      </div>
    </div>
  )
}

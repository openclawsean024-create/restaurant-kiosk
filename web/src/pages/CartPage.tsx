import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../lib/cartStore'
import { listItems, getOptionGroups, createOrder, currentMemberPhone, recordSpend, setCurrentMember } from '../lib/db'
import { computeLinePrice, formatOptionNames, computeCartTotal } from '../lib/helpers'
import { useState } from 'react'

export default function CartPage() {
  const lines = useCart(s => s.lines)
  const remove = useCart(s => s.remove)
  const clear = useCart(s => s.clear)
  const items = listItems()
  const groups = getOptionGroups()
  const nav = useNavigate()
  const [phone, setPhone] = useState(currentMemberPhone() ?? '')
  const [error, setError] = useState('')

  const subtotal = computeCartTotal(lines, items, groups)
  const isVip = phone.trim().length >= 8
  const discount = isVip ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount

  function checkout() {
    if (lines.length === 0) {
      setError('購物車是空的')
      return
    }
    if (phone.trim().length < 8) {
      setError('請輸入有效的電話號碼(至少 8 碼)')
      return
    }
    setError('')
    setCurrentMember(phone.trim())
    recordSpend(phone.trim(), total)
    const order = createOrder(lines.map(l => ({
      itemId: l.itemId, quantity: l.quantity, optionIds: l.optionIds,
    })))
    clear()
    nav(`/order/${order.id}`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🛒 我的購物車</h1>

      {lines.length === 0 && (
        <div className="text-center py-12 text-slate-500" data-testid="empty-cart">
          <p>購物車是空的</p>
          <Link to="/" className="text-orange-600 hover:underline">去點餐</Link>
        </div>
      )}

      {lines.map(line => {
        const item = items.find(i => i.id === line.itemId)
        if (!item) return null
        const opts = formatOptionNames(line.optionIds, groups)
        const lineTotal = computeLinePrice(item, line.optionIds, groups, line.quantity)
        return (
          <div
            key={line.uid}
            className="border border-slate-200 rounded p-3 mb-2 flex items-center justify-between"
            data-testid={`cart-line-${line.uid}`}
          >
            <div className="flex-1">
              <div className="text-xl mr-2 inline">{item.image}</div>
              <span className="font-medium">{item.name}</span>
              <span className="text-slate-500 ml-2">x{line.quantity}</span>
              {opts && <div className="text-xs text-slate-500 mt-1">{opts}</div>}
            </div>
            <div className="text-sm font-medium mr-3">NT$ {lineTotal}</div>
            <button
              onClick={() => remove(line.uid)}
              className="text-red-500 text-sm hover:underline"
              data-testid={`remove-${line.uid}`}
            >
              移除
            </button>
          </div>
        )
      })}

      {lines.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <label className="block mb-2 text-sm font-medium">
            會員電話(滿 NT$1000 自動升級 VIP,享 9 折)
          </label>
          <input
            type="tel"
            placeholder="0912345678"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded mb-2"
            data-testid="member-phone"
          />
          {isVip && (
            <div className="text-xs text-amber-600 mb-2" data-testid="vip-hint">⭐ VIP 會員享 9 折優惠</div>
          )}

          <div className="text-sm space-y-1">
            <div className="flex justify-between"><span>小計</span><span>NT$ {subtotal}</span></div>
            {isVip && (
              <div className="flex justify-between text-amber-600" data-testid="discount-row">
                <span>VIP 折扣</span><span>-NT$ {discount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base border-t pt-1">
              <span>總計</span><span data-testid="total">NT$ {total}</span>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <button
            onClick={checkout}
            className="mt-4 w-full px-4 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 font-medium"
            data-testid="checkout"
          >
            結帳送出訂單
          </button>
        </div>
      )}
    </div>
  )
}

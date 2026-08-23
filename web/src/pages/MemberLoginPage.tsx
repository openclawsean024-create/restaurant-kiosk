import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginOrCreateMember, setCurrentMember, currentMemberPhone, listMembers } from '../lib/db'

export default function MemberLoginPage() {
  const nav = useNavigate()
  const [phone, setPhone] = useState(currentMemberPhone() ?? '')
  const [error, setError] = useState('')

  function login() {
    if (phone.trim().length < 8) {
      setError('電話號碼至少 8 碼')
      return
    }
    setError('')
    loginOrCreateMember(phone.trim())
    setCurrentMember(phone.trim())
    nav('/')
  }

  const allMembers = listMembers().slice(0, 5)

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">👤 會員登入</h1>

      <div className="border border-slate-200 rounded p-6">
        <label className="block text-sm mb-2">電話號碼</label>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="0912345678"
          className="w-full px-3 py-2 border border-slate-300 rounded mb-3"
          data-testid="member-phone-input"
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          onClick={login}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          data-testid="login-btn"
        >
          登入 / 註冊
        </button>
      </div>

      {allMembers.length > 0 && (
        <div className="mt-6 border border-slate-200 rounded p-4 text-sm">
          <h3 className="font-medium mb-2">最近會員(開發示範)</h3>
          {allMembers.map(m => (
            <div key={m.phone} className="text-xs text-slate-600 py-1 border-b last:border-b-0">
              {m.phone}{' · '}
              <span className={m.isVip ? 'text-amber-600 font-medium' : ''}>
                {m.isVip ? '⭐ VIP' : '一般'} · NT${m.totalSpent}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

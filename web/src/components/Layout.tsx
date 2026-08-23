import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold">🍽️ 餐飲點餐快手</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:underline">菜單</Link>
            <Link to="/cart" className="hover:underline" data-testid="nav-cart">🛒 購物車</Link>
            <Link to="/admin/orders" className="hover:underline text-slate-500">店家後台</Link>
            <Link to="/admin/kds" className="hover:underline text-orange-600" data-testid="nav-kds">👨‍🍳 KDS</Link>
            <Link to="/member/login" className="hover:underline">會員</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">{children}</main>
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        餐飲點餐快手 · Sprint 2 · KDS 廚房顯示系統
      </footer>
    </div>
  )
}

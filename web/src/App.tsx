import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import OrderStatusPage from './pages/OrderStatusPage'
import AdminOrdersPage from './pages/AdminOrdersPage'
import AdminItemsPage from './pages/AdminItemsPage'
import MemberLoginPage from './pages/MemberLoginPage'
import KdsPage from './pages/KdsPage'
import './lib/bootstrap'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order/:orderId" element={<OrderStatusPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/items" element={<AdminItemsPage />} />
        <Route path="/admin/kds" element={<KdsPage />} />
        <Route path="/member/login" element={<MemberLoginPage />} />
      </Routes>
    </Layout>
  )
}

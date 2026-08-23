import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import { createOrder, listOrders } from '../src/lib/db'

function renderAt(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

beforeEach(() => {
  localStorage.clear()
})

describe('Sprint 2 - KDS 廚房顯示系統', () => {
  it('KDS 路由存在於 nav', () => {
    renderAt('/admin/kds')
    expect(screen.getByTestId('nav-kds')).toBeInTheDocument()
  })

  it('KDS 空狀態顯示', () => {
    renderAt('/admin/kds')
    expect(screen.getByTestId('kds-empty')).toBeInTheDocument()
  })

  it('有新訂單時 KDS 不顯示空狀態', () => {
    createOrder([{ itemId: 'i1', quantity: 2, optionIds: ['o1'] }])
    renderAt('/admin/kds')
    expect(screen.queryByTestId('kds-empty')).not.toBeInTheDocument()
  })

  it('KDS 顯示訂單編號(大字)', () => {
    const order = createOrder([{ itemId: 'i1', quantity: 1, optionIds: [] }])
    renderAt('/admin/kds')
    expect(screen.getByTestId(`kds-order-${order.id}`)).toBeInTheDocument()
  })

  it('KDS 訂單按等待時間排序(最舊在最上面)', () => {
    const order1 = createOrder([{ itemId: 'i1', quantity: 1, optionIds: [] }])
    const order2 = createOrder([{ itemId: 'i2', quantity: 1, optionIds: [] }])
    renderAt('/admin/kds')
    const grid = screen.getByTestId('kds-grid')
    const orderIds = within(grid).queryAllByTestId(/-order-/).map(el => el.getAttribute('data-testid'))
    expect(orderIds[0]).toContain(order1.id)
    expect(orderIds[1]).toContain(order2.id)
  })

  it('KDS 進階按鈕可推進狀態', () => {
    const order = createOrder([{ itemId: 'i1', quantity: 1, optionIds: [] }])
    renderAt('/admin/kds')
    const btn = screen.getByTestId(`kds-advance-${order.id}`)
    fireEvent.click(btn)
    // 狀態變 '製作中',KDS 仍顯示(已接單→製作中仍在前台)
    expect(listOrders().find(o => o.id === order.id)?.status).toBe('製作中')
  })
})

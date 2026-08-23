export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  image: string
  available: boolean
}
export interface Option {
  id: string
  name: string
  priceDelta: number
}
export interface ItemOptionGroup {
  id: string
  name: string
  required: boolean
  multiple: boolean
  options: Option[]
}
export interface OrderItem {
  itemId: string
  quantity: number
  optionIds: string[]
}
export type OrderStatus = '已接單' | '製作中' | '可取餐' | '已取餐'
export interface Order {
  id: string
  items: OrderItem[]
  status: OrderStatus
  createdAt: number
  updatedAt: number
  memberPhone: string | null
}
export interface Member {
  phone: string
  isVip: boolean
  totalSpent: number
  joinedAt: number
}

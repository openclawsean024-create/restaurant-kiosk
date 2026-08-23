import type { MenuItem, OrderItem, ItemOptionGroup } from './types'

export function computeLinePrice(item: MenuItem, optionIds: string[], groups: ItemOptionGroup[], qty = 1): number {
  let linePrice = item.price
  for (const oid of optionIds) {
    for (const g of groups) {
      const opt = g.options.find(o => o.id === oid)
      if (opt) linePrice += opt.priceDelta
    }
  }
  return linePrice * qty
}

export function formatOptionNames(optionIds: string[], groups: ItemOptionGroup[]): string {
  const names: string[] = []
  for (const oid of optionIds) {
    for (const g of groups) {
      const opt = g.options.find(o => o.id === oid)
      if (opt) { names.push(opt.name); break }
    }
  }
  return names.filter(Boolean).join(' / ')
}

export function computeCartTotal(items: OrderItem[], itemList: MenuItem[], groups: ItemOptionGroup[]): number {
  return items.reduce((sum, line) => {
    const item = itemList.find(i => i.id === line.itemId)
    if (!item) return sum
    return sum + computeLinePrice(item, line.optionIds, groups, line.quantity)
  }, 0)
}

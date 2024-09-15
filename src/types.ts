interface Inventory extends Array<InventoryItem> {}

interface InventoryItem {
    sku: string
    stock: Stock
}

interface Stock {
    count: string
    blocked: number
}

interface Orders extends Array<Order> {}

interface Order {
    id: string
    order_lines : OrderLine[]
}

interface OrderLine {
    sku: string
    quantity: number
}

interface InventoryLevel {
    inventoryLevels: Levels[]
}

interface Levels {
    sku: string
    count: number
    blocked: number
    booked: number
    missing: number
    available: number
}

export {
    Inventory,
    InventoryItem,
    Stock,
    Orders,
    Order,
    OrderLine,
    InventoryLevel,
    Levels
}
import { Inventory, InventoryLevel, Levels, Orders } from "../types";

const initializeInventoryMap = (inventory: Inventory): Map<string, Levels> => {
  const inventoryMap = new Map<string, Levels>();

  
  inventory.forEach((item) => {
    const count = parseInt(item.stock.count);
    const blocked = item.stock.blocked;

    validateStock(count, blocked, item.sku);

    inventoryMap.set(item.sku, {
      sku: item.sku,
      count,
      blocked,
      booked: 0,
      missing: 0,
      available: Math.max(0, count - blocked),
    });
  });

  return inventoryMap;
};

const processOrdersLine = ( inventoryItem: Levels, quantity: number, sku: string, orderId: string ): void => {

  validateQuantity(quantity, sku, orderId);

  const stockAvailable = inventoryItem.count - inventoryItem.blocked;
  const quantityToBook = Math.min(quantity, stockAvailable);

  inventoryItem.booked += quantityToBook;
  inventoryItem.available = Math.max( 0, inventoryItem.count - inventoryItem.blocked - inventoryItem.booked );
  inventoryItem.missing = Math.max(0, quantity - quantityToBook);
};

const validateStock = (count: number, blocked: number, sku: string): void => {

  if (isNaN(count) || count < 0) {
    throw new Error(`Invalid count value for SKU ${sku}`);
  }

  if (isNaN(blocked) || blocked < 0) {
    throw new Error(`Invalid blocked value for SKU ${sku}`);
  }
};

const validateQuantity = ( quantity: number, sku: string, orderId: string): void => {

  if (isNaN(quantity) || quantity < 0) {
    throw new Error(
      `Invalid quantity value for SKU ${sku} in order ${orderId}`
    );
  }
};

const calculateInventoryLevel = ( inventory: Inventory, orders: Orders ): InventoryLevel => {

  const inventoryMap = initializeInventoryMap(inventory);

  orders.forEach((order) => {
    order.order_lines.forEach((line) => {
      const inventoryItem = inventoryMap.get(line.sku);

      if (inventoryItem) {
        const quantity = line.quantity;
        processOrdersLine(inventoryItem, quantity, line.sku, order.id);
      } else {
        throw new Error(`SKU ${line.sku} not found in inventory`);
      }
    });
  });

  return {
    inventoryLevels: Array.from(inventoryMap.values()),
  };
};

export { calculateInventoryLevel };

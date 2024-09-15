import { Inventory, Orders } from "../types";

const validateInventory = (inventoryObj: Inventory): boolean => {
    
    if (!Array.isArray(inventoryObj)) {
    return false;
  }

  //item.stock.count realmente es un string o es un error de typo en el ejemplo del challenge?
  return inventoryObj.every(
    (item) =>
      typeof item.sku === "string" &&
      item.stock &&
      typeof item.stock.count === "string" &&
      typeof item.stock.blocked === "number"
  );
};

const validateOrders = (orderObj: Orders): boolean => {
  if (!Array.isArray(orderObj)){
    return false
};

  

  return orderObj.every(
    (order) =>
      typeof order.id === "string" &&
      Array.isArray(order.order_lines) &&
      order.order_lines.every(
        (line) =>
          typeof line.sku === "string" && typeof line.quantity === "number"
      )
  );
};

export {
    validateInventory,
    validateOrders
}

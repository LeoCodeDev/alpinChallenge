import { Request, Response } from 'express';
import { validateInventory, validateOrders } from '../utils/validateObj';
import { calculateInventoryLevel } from '../utils/calculateStockLevel';

const getInventoryLevels = (req: Request, res: Response) => {
  const {inventory, orders} = req.body

  console.log(req.body);
  

  try {
    if(!validateInventory(inventory) && !validateOrders(orders)) {
        return res.status(400).send('Invalid request body');
    }

    const inventoryLevels = calculateInventoryLevel(inventory, orders);

    return res.status(200).json(inventoryLevels);

  } catch (error) {
    console.log(error);
    
    return res.status(500).send('Internal Server Error');
  }
};

export {
    getInventoryLevels
}
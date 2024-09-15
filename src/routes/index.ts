import { Router } from 'express';
import { getInventoryLevels } from '../controllers/getInventoryLevels';

const router = Router()

router.post('/inventory-levels', getInventoryLevels);

export {
    router
}
import { Router } from "express";
import { addDetailValues,deleteDetailValues,getDetailValues,getDetailValuesById,updateDetailValues } from "../../controllers/api_controllers/detail_values.controller.js";
const router = Router();

router.get('/detail-value/:id', getDetailValuesById);
router.post('/detail-values', getDetailValues);
router.post('/detail-value', addDetailValues);
router.put('/detail-value/:id', updateDetailValues);
router.delete('/detail-value/:id', deleteDetailValues);

export default router;
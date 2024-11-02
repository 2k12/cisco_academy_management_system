import { Router } from "express";
import {
  addDetail,
  deleteDetail,
  getDetails,
} from "../../controllers/api_controllers/detail.controller.js";
const router = Router();

// router.get('/detail-value/:id', getDetailValuesById);
router.post("/details", getDetails);
router.post("/detail", addDetail);
// router.put('/detail-value/:id', updateDetailValues);
router.delete("/detail/:id", deleteDetail);

export default router;

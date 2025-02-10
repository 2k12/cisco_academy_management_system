import { Router } from "express";
import {  addCost, getCostById, getCosts, updateCost, deleteCost } from "../../controllers/api_controllers/cost.controller.js";
const router = Router();

router.get('/cost/:id', getCostById);
router.post('/costs', getCosts);
router.post('/cost', addCost);
router.put('/cost/:id', updateCost);
router.delete('/cost/:id', deleteCost);
// router.get('/modalities-dropdown', getModalitiesDropdown);


export default router;
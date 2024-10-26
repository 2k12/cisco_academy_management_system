import { Router } from "express";
import {  addModality, getModalities, getModalityById, updateModality, deleteModality } from "../../controllers/api_controllers/modality.controller.js";
const router = Router();

router.get('/modality/:id', getModalityById);
router.post('/modalities', getModalities);
router.post('/modality', addModality);
router.put('/modality/:id', updateModality);
router.delete('/modality/:id', deleteModality);

export default router;
import { Router } from "express";
import { addInfoUtn,deleteInfoUtn,getInfoUtnById,getInfosUtn,updateInfoUtn } from "../../controllers/api_controllers/info_utn.controller.js";
const router = Router();

router.get('/info-utn/:id', getInfoUtnById);
router.post('/infos-utn', getInfosUtn);
router.post('/info-utn', addInfoUtn);
router.put('/info-utn/:id', updateInfoUtn);
router.delete('/info-utn/:id', deleteInfoUtn);

export default router;
import { Router } from "express";
import { addPermission,getPermission,getPermissionById,updatePermission, inactivePermission } from "../../controllers/api_controllers/permission.controller.js";
const router = Router();

router.get('/permission/:id', getPermissionById);
// router.get('/permissions', getPermission);
router.post('/permissions', getPermission);
router.post('/permission', addPermission);
router.put('/permission/:id', updatePermission);
router.delete('/permission/:id', inactivePermission);

export default router;
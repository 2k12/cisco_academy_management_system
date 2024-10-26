import { Router } from "express";
import { login, logout, profile, verify} from "../../controllers/sesion_controllers/auth.controller.js";
import { authRequired } from "../../middlewares/validateToken.js";
const router = Router();

router.post('/login',login);
router.post('/logout',logout);
router.post('/profile', authRequired, profile);
router.get('/verify', verify);

export default router;
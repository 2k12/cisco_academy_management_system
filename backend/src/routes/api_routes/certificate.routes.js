import { Router } from "express";
import { addCertificate, deleteCertificate, getCartificates, getCertificateById, updateCertificate} from "../../controllers/api_controllers/certificate.controller.js";
const router = Router();

router.get('/certificate/:id', getCertificateById);
router.post('/certificates', getCartificates);
router.post('/certificate', addCertificate);
router.put('/certificate/:id', updateCertificate);
router.delete('/certificate/:id', deleteCertificate);

export default router;
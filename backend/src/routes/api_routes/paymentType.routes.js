import { Router } from "express";
import { addPaymentType,getPaymentType,getPaymentTypeById,getPaymetnTypesDropdown,updatePaymentType } from "../../controllers/api_controllers/payment_type.controller.js";
const router = Router();

router.get('/payment_type/:id', getPaymentTypeById);
router.get('/payment-type-dropdown', getPaymetnTypesDropdown);
router.post('/payment_types', getPaymentType);
router.post('/payment_type', addPaymentType);
router.put('/payment_type/:id', updatePaymentType);
// router.delete('/user', register);

export default router;
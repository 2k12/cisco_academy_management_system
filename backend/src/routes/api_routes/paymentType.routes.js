import { Router } from "express";
import { addPaymentType,deletePaymentType,getPaymentTypes,getPaymentTypeById,getPaymetnTypesDropdown,updatePaymentType } from "../../controllers/api_controllers/payment_type.controller.js";
const router = Router();

router.get('/payment-type/:id', getPaymentTypeById);
router.post('/payment-types', getPaymentTypes);
router.get('/payment-type-dropdown', getPaymetnTypesDropdown);
router.post('/payment-type', addPaymentType);
router.put('/payment-type/:id', updatePaymentType);
router.delete('/payment-type/:id', deletePaymentType);

export default router;
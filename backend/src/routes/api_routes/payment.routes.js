import { Router } from "express";
import { 
    addPayment,
    deletePayment,
    getPayments,
    getPaymentById,
    getPaymentsDropdown,
    updatePayment
} from "../../controllers/api_controllers/payment.controller.js";
const router = Router();

router.get('/payment/:id', getPaymentById);
router.post('/payments', getPayments);
router.get('/payment-dropdown', getPaymentsDropdown);
router.post('/payment', addPayment);
router.put('/payment/:id', updatePayment);
router.delete('/payment/:id', deletePayment);

export default router;
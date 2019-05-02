import express from 'express';
import OrderController from '../../controllers/orderController';
import Authenticator from '../../middlewares/authenticator';
import validateOrderFields from '../../middlewares/orderValidator';

const { confirmToken } = Authenticator;

const router = express.Router();
router.post('/orders', confirmToken, validateOrderFields, OrderController.createOrder);
router.get('/orders/inCustomer', confirmToken, OrderController.ordersByCustomer);
router.get('/orders/:order_id', confirmToken, OrderController.orderInfo);

export default router;

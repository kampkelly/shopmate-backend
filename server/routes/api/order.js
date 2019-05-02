import express from 'express';
import OrderController from '../../controllers/orderController';
import Authenticator from '../../middlewares/authenticator';

const { confirmToken } = Authenticator;

const router = express.Router();
router.post('/orders', confirmToken, OrderController.createOrder);
router.get('/orders/inCustomer', confirmToken, OrderController.ordersByCustomer);

export default router;

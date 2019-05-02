import express from 'express';
import OrderController from '../../controllers/orderController';
import Authenticator from '../../middlewares/authenticator';

const { confirmToken } = Authenticator;

const router = express.Router();
router.post('/orders', confirmToken, OrderController.createOrder);

export default router;

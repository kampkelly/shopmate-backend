import express from 'express';
import StripeController from '../../controllers/stripeController';
import Authenticator from '../../middlewares/authenticator';

const { confirmToken } = Authenticator;
const router = express.Router();
router.post('/stripe/charge', confirmToken, StripeController.payWithStripe);

export default router;

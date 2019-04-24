import express from 'express';
import product from './product';
import customer from './customer';
import shoppingCart from './shoppingCart';
import socialLogin from './socialLogin';
import stripe from './stripe';

const router = express.Router();

router.use('/', product);
router.use('/', customer);
router.use('/', shoppingCart);
router.use('/', socialLogin);
router.use('/', stripe);

export default router;

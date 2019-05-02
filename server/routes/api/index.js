import express from 'express';
import product from './product';
import customer from './customer';
import shoppingCart from './shoppingCart';
import socialLogin from './socialLogin';
import stripe from './stripe';
import order from './order';

const router = express.Router();

router.use('/', product);
router.use('/', customer);
router.use('/', shoppingCart);
router.use('/', socialLogin);
router.use('/', stripe);
router.use('/', order);

router.get('/', (req, res) => {
  res.status(404).send('Welcome to Shopmate backend');
});

export default router;

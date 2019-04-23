import express from 'express';
import product from './product';
import customer from './customer';
import shoppingCart from './shoppingCart';
import socialLogin from './socialLogin';

const router = express.Router();

router.use('/', product);
router.use('/', customer);
router.use('/', shoppingCart);
router.use('/', socialLogin);

export default router;

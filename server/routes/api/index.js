import express from 'express';
import product from './product';
import customer from './customer';
import shoppingCart from './shoppingCart';

const router = express.Router();

router.use('/', product);
router.use('/', customer);
router.use('/', shoppingCart);

export default router;

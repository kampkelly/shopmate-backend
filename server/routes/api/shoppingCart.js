import express from 'express';
import ShoppingCartController from '../../controllers/shoppingCartController';

const router = express.Router();
router.get('/shoppingcart/generateUniqueId', ShoppingCartController.generateUniqueId);
router.get('/shoppingcart/:cart_id', ShoppingCartController.getProductsInCart);

export default router;

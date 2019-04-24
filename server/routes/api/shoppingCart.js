import express from 'express';
import ShoppingCartController from '../../controllers/shoppingCartController';

const router = express.Router();
router.get('/shoppingcart/generateUniqueId', ShoppingCartController.generateUniqueId);
router.get('/shoppingcart/:cart_id', ShoppingCartController.getProductsInCart);
router.post('/shoppingcart/add', ShoppingCartController.addProductToCart);
router.delete('/shoppingcart/empty/:cart_id', ShoppingCartController.clearCart);

export default router;

import express from 'express';
import ShoppingCartController from '../../controllers/shoppingCartController';

const router = express.Router();
router.get('/shoppingcart/generateUniqueId', ShoppingCartController.generateUniqueId);

export default router;

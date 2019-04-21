import express from 'express';
import ProductController from '../../controllers/productController';

const router = express.Router();
router.get('/products', ProductController.viewAllProducts);
router.get('/products/:productId', ProductController.viewSingleProduct);
router.get('/products/inCategory/:categoryId', ProductController.getProductsInCategory);

export default router;

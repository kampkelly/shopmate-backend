import express from 'express';
import ProductController from '../../controllers/productController';


const router = express.Router();
router.get('/products', ProductController.viewAllProducts);

export default router;

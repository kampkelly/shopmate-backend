import express from 'express';
import ProductController from '../../controllers/productController';
import productValidator from '../../middlewares/productValidator';

const router = express.Router();
router.get('/products', productValidator.validateQueryParams, ProductController.viewAllProducts);
router.get('/products/search', productValidator.validateQueryParams, ProductController.searchProducts);
router.get('/products/:productId', ProductController.viewSingleProduct);
router.get('/products/inCategory/:categoryId', productValidator.validateQueryParams, ProductController.getProductsInCategory);
router.get('/products/inDepartment/:departmentId', productValidator.validateQueryParams, ProductController.getProductsInDepartment);

export default router;

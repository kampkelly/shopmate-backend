import express from 'express';
import CategoryController from '../../controllers/categoryController';
import categoryCaching from '../../middlewares/caching/categoryCaching';
import categoryValidator from '../../middlewares/categoryValidator';

const router = express.Router();
router.get('/categories', categoryValidator.validateQueryParams, categoryCaching.allCategoriesCaching, CategoryController.viewAllCategories);
router.get('/categories/:category_id', CategoryController.viewSingleCategory);
router.get('/categories/inProduct/:product_id', CategoryController.getProductCategory);

export default router;

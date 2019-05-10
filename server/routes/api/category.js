import express from 'express';
import CategoryController from '../../controllers/categoryController';
import categoryCaching from '../../middlewares/caching/categoryCaching';
import categoryValidator from '../../middlewares/categoryValidator';

const router = express.Router();
router.get('/categories', categoryValidator.validateQueryParams, categoryCaching.allCategoriesCaching, CategoryController.viewAllCategories);

export default router;

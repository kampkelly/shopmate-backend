import express from 'express';
import ShippingRegionController from '../../controllers/shippingRegionController';

const router = express.Router();
router.get('/shipping/regions', ShippingRegionController.allShippingRegions);

export default router;

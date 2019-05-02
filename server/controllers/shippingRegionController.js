import 'dotenv/config';
import Model from '../database/models';
import errorResponse from '../helpers/errorResponse';

const {
  ShippingRegion
} = Model;

/**
 *
 *
 * @export
 * @class ShippingRegionController
 * @description Operations on shipping regions
 */
export default class ShippingRegionController {
  /**
    * @description -This method gets all shiping regions
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {array} - shiiping regions
    */
  static async allShippingRegions(req, res) {
    try {
      const shippingRegions = await ShippingRegion.findAll();
      res.status(200).json(shippingRegions);
    } catch (error) {
      return res.status(500).json(errorResponse(req, res, 500, 'SHR_500', error.parent.sqlMessage, ''));
    }
  }
}

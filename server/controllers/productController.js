import Sequelize from 'sequelize';
import Model from '../models';

const {
  Product
} = Model;

/**
 *
 *
 * @export
 * @class ProductController
 * @description Operations on Products
 */
export default class ProductController {
  /**
    * @description -This method views all products
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - count and products
    */
  static async viewAllProducts(req, res) {
    try {
      const query = {
        where: Sequelize.where(Sequelize.fn('char_length', Sequelize.col('description')), '<=', 200),
        limit: 19,
        offset: 0
      };
      if (req.query.limit) {
        query.limit = parseInt(req.query.limit);
      }
      if (req.query.page) {
        query.offset = parseInt(req.query.limit) * (parseInt(req.query.page) - 1);
      }
      if (req.query.description_length) {
        const descriptionLength = req.query.description_length;
        query.where = Sequelize.where(Sequelize.fn('char_length', Sequelize.col('description')), '<=', descriptionLength);
      }
      query.attributes = ['product_id', 'name', 'description', 'price', 'discounted_price', 'thumbnail'];
      const products = await Product.findAll(query);
      const allProducts = await Product.findAll();
      const count = allProducts.length;
      res.status(200).json({ count, rows: products });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

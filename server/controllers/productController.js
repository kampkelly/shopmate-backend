import Sequelize from 'sequelize';
import Model from '../models';

const {
  Category, Product
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

  /**
    * @description -This method views a single product
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - product
    */
  static async viewSingleProduct(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findOne({
        where: { product_id: productId },
        attributes: [
          'product_id',
          'name',
          'description',
          'price',
          'discounted_price',
          'image',
          'image_2',
          'thumbnail',
          'display'
        ]
      });
      if (!product) {
        res.status(404).json({ product, message: 'Product cannot be found' });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  /**
    * @description -This method gets products in a category
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - products in category
    */
  static async getProductsInCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const query = {
        where: { category_id: categoryId },
        attributes: [
          'category_id'
        ],
        include: [{
          model: Product,
          attributes: [
            'product_id',
            'name',
            'description',
            'price',
            'discounted_price',
            'thumbnail'
          ],
          through: { attributes: [] },
        }]
      };
      const category = await Category.findOne(query);
      if (!category) {
        res.status(404).json({ category, message: 'Category cannot be found' });
      } else {
        const count = category.Products.length;
        res.status(200).json({ count, rows: category.Products });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

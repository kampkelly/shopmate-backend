import Sequelize, { Op } from 'sequelize';
import Model from '../models';
import productHelper from '../helpers/product';

const {
  Category, Department, Product
} = Model;
const {
  nestedPagination, filterByDescriptionLength
} = productHelper;

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
      const { page, limit, description_length: descriptionLength } = req.query;
      const query = {
        where: { category_id: categoryId },
        attributes: [],
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
        let rows = [];
        rows = nestedPagination(category.Products, page, limit);
        if (descriptionLength) {
          rows = filterByDescriptionLength(rows, descriptionLength);
        }
        const count = category.Products.length;
        res.status(200).json({ count, rows });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  /**
    * @description -This method gets products in a department
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - products in department
    */
  static async getProductsInDepartment(req, res) {
    try {
      const { departmentId } = req.params;
      const { page, limit, description_length: descriptionLength } = req.query;
      const query = {
        where: { department_id: departmentId },
        attributes: [
          'department_id'
        ],
        include: [{
          model: Category,
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
        }]
      };
      const department = await Department.findOne(query);
      if (!department) {
        res.status(404).json({ department, message: 'Category cannot be found' });
      } else {
        const allProducts = department.Categories
          .reduce((combinedProducts, category) => combinedProducts.concat(category.Products), []);
        let rows = [];
        rows = nestedPagination(allProducts, page, limit);
        if (descriptionLength) {
          rows = filterByDescriptionLength(rows, descriptionLength);
        }
        const count = allProducts.length;
        res.status(200).json({ count, rows });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  /**
    * @description -This method search products
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - search products
    */
  static async searchProducts(req, res) {
    try {
      const { query_string: queryString } = req.query;
      const { page, limit, description_length: descriptionLength } = req.query;
      const query = {
        where: {
          [Op.or]: [{
            name: { [Op.like]: `%${queryString}%` },
          }, {
            description: { [Op.like]: `%${queryString}%` }
          }]
        }
      };
      query.attributes = ['product_id', 'name', 'description', 'price', 'discounted_price', 'thumbnail'];
      const products = await Product.findAll(query);
      let rows = [];
      rows = nestedPagination(products, page, limit);
      if (descriptionLength) {
        rows = filterByDescriptionLength(rows, descriptionLength);
      }
      const count = products.length;
      res.status(200).json({ count, rows });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

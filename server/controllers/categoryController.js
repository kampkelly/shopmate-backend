/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import asyncRedis from 'async-redis';
import 'dotenv/config';
import Model from '../database/models';
import errorResponse from '../helpers/errorResponse';

const redisClient = asyncRedis.createClient(process.env.REDIS_URL);
const {
  Category
} = Model;

/**
 *
 *
 * @export
 * @class CategoryController
 * @description Operations on Categories
 */
export default class CategoryController {
  /**
    * @description -This method views all categories
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - count and categories
    */
  static async viewAllCategories(req, res) {
    try {
      const query = {
        limit: 20,
        offset: 0,
        order: []
      };
      if (req.query.limit) {
        query.limit = parseInt(req.query.limit);
      }
      if (req.query.page) {
        query.offset = parseInt(query.limit) * ((parseInt(req.query.page) - 1));
      }
      if (req.query.order) {
        if (req.query.order === 'category_id' || req.query.order === 'name') {
          query.order[0] = [req.query.order, 'DESC'];
        }
      }
      const categories = await Category.findAll(query);
      const allcategories = await Category.findAll();
      const count = allcategories.length;
      redisClient.setex(req.cacheKey, process.env.REDIS_TIMEOUT, JSON.stringify({
        count,
        rows: categories
      }));
      return res.status(200).json({ count, rows: categories });
    } catch (error) {
      return res.status(500).json(errorResponse(req, res, 500, 'CAT_500', error.parent.sqlMessage, ''));
    }
  }

  /**
    * @description -This method views a single category
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - category
    */
  static async viewSingleCategory(req, res) {
    try {
      const { category_id: categoryId } = req.params;
      const category = await Category.findOne({
        where: { category_id: categoryId },
        attributes: [
          'category_id',
          'name',
          'description',
          'department_id'
        ]
      });
      if (category) {
        return res.status(200).json(category);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: 'Category cannot be found',
        }
      });
    } catch (error) {
      return res.status(500).json(errorResponse(req, res, 500, 'CAT_500', error.parent.sqlMessage, ''));
    }
  }
}

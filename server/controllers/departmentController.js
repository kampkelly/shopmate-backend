/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import asyncRedis from 'async-redis';
import 'dotenv/config';
import Model from '../database/models';
import errorResponse from '../helpers/errorResponse';

const redisClient = asyncRedis.createClient(process.env.REDIS_URL);
const {
  Department
} = Model;

/**
 *
 *
 * @export
 * @class DepartmentController
 * @description Operations on Departments
 */
export default class DepartmentController {
  /**
    * @description -This method views all departments
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {array} - departments
    */
  static async viewAllDepartments(req, res) {
    try {
      const departments = await Department.findAll();
      redisClient.setex(req.cacheKey, process.env.REDIS_TIMEOUT, JSON.stringify(departments));
      return res.status(200).json(departments);
    } catch (error) {
      return res.status(500).json(errorResponse(req, res, 500, 'DEP_500', error.parent.sqlMessage, ''));
    }
  }
}

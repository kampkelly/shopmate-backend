import bcrypt from 'bcrypt';
import 'dotenv/config';
import Model from '../database/models';
import Authenticator from '../middlewares/authenticator';
import errorResponse from '../helpers/errorResponse';

const {
  Customer
} = Model;
const saltRounds = 10;
const { generateToken } = Authenticator;

/**
 *
 *
 * @export
 * @class CustomerController
 * @description Operations on Customer
 */
export default class CustomerController {
  /**
    * @description -This method registers a customer
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - customer
    */
  static async RegisterCustomer(req, res) {
    try {
      const { email, name, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const existingCustomer = await Customer.findOne({ where: { email } });
      if (existingCustomer) {
        return res.status(409).json(errorResponse(req, res, 409, 'USR_04', 'The email already exists', 'email'));
      }
      const customer = await Customer.create({ email, name, password: hashedPassword }, { attributes: ['name'] });
      let returnedCustomer = customer;
      returnedCustomer = Object.assign({
        customer_id: returnedCustomer.dataValues.customer_id,
        name: returnedCustomer.dataValues.name,
        email: returnedCustomer.dataValues.email,
        address_1: returnedCustomer.dataValues.address_1,
        address_2: returnedCustomer.dataValues.address_2,
        city: returnedCustomer.dataValues.city,
        region: returnedCustomer.dataValues.region,
        postal_code: returnedCustomer.dataValues.postal_code,
        shipping_region_id: returnedCustomer.dataValues.shipping_region_id,
        day_phone: returnedCustomer.dataValues.day_phone,
        eve_phone: returnedCustomer.dataValues.eve_phone,
        mob_phone: returnedCustomer.dataValues.mob_phone
      }, {});
      const token = generateToken({
        id: returnedCustomer.customer_id, name: returnedCustomer.name, email: returnedCustomer.email
      });

      res.status(201).json({ customer: returnedCustomer, accessToken: `Bearer ${token}`, expires_in: process.env.TOKEN_EXPIRATION });
    } catch (error) {
      return res.status(500).json(errorResponse(req, res, 500, 'USR_05', error.parent.sqlMessage, ''));
    }
  }

  /**
    * @description -This method logins a customer
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - customer
    */
  static async LoginCustomer(req, res) {
    try {
      const { email, password } = req.body;
      const customer = await Customer.findOne({ where: { email } });
      if (!customer) {
        return res.status(401).json(errorResponse(req, res, 401, 'USR_01', 'Email or Password is invalid.', ''));
      }
      let returnedCustomer = customer;
      returnedCustomer = Object.assign({
        customer_id: returnedCustomer.dataValues.customer_id,
        name: returnedCustomer.dataValues.name,
        email: returnedCustomer.dataValues.email,
        address_1: returnedCustomer.dataValues.address_1,
        address_2: returnedCustomer.dataValues.address_2,
        city: returnedCustomer.dataValues.city,
        region: returnedCustomer.dataValues.region,
        postal_code: returnedCustomer.dataValues.postal_code,
        shipping_region_id: returnedCustomer.dataValues.shipping_region_id,
        day_phone: returnedCustomer.dataValues.day_phone,
        eve_phone: returnedCustomer.dataValues.eve_phone,
        mob_phone: returnedCustomer.dataValues.mob_phone
      }, {});
      const checkPassword = await bcrypt.compareSync(password, customer.password);
      let token = '';
      if (checkPassword) {
        token = generateToken({
          id: returnedCustomer.customer_id,
          name: returnedCustomer.name,
          email: returnedCustomer.email
        });
      } else {
        return res.status(401).json(errorResponse(req, res, 401, 'USR_01', 'Email or Password is invalid.', ''));
      }
      return res.status(200).json({ user: returnedCustomer, accessToken: `Bearer ${token}`, expires_in: process.env.TOKEN_EXPIRATION });
    } catch (error) {
      return res.status(500).json(errorResponse(req, res, 500, 'USR_05', error.parent.sqlMessage, ''));
    }
  }

  /**
    * @description -This method updates a customer's address
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - customer
    */
  static async UpdateCustomerAddress(req, res) {
    try {
      const { email } = req.user;
      const customer = await Customer.findOne({ where: { email } });
      if (!customer) {
        return res.status(404).json(errorResponse(req, res, 404, 'USR_04', 'Customer does not exist', ''));
      }
      const updatedCustomer = await customer.update(req.body);
      let returnedCustomer = updatedCustomer;
      returnedCustomer = Object.assign({
        customer_id: updatedCustomer.dataValues.customer_id,
        name: updatedCustomer.dataValues.name,
        email: updatedCustomer.dataValues.email,
        address_1: updatedCustomer.dataValues.address_1,
        address_2: updatedCustomer.dataValues.address_2,
        city: updatedCustomer.dataValues.city,
        region: updatedCustomer.dataValues.region,
        postal_code: updatedCustomer.dataValues.postal_code,
        country: updatedCustomer.dataValues.country,
        shipping_region_id: updatedCustomer.dataValues.shipping_region_id,
        credit_Card: updatedCustomer.dataValues.credit_card,
        day_phone: updatedCustomer.dataValues.day_phone,
        eve_phone: updatedCustomer.dataValues.eve_phone,
        mob_phone: updatedCustomer.dataValues.mob_phone
      }, {});
      return res.status(200).json(returnedCustomer);
    } catch (error) {
      return res.status(500).json(errorResponse(req, res, 500, 'USR_05', error, ''));
    }
  }
}

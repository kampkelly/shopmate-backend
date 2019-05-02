import 'dotenv/config';
import Model from '../database/models';
import errorResponse from '../helpers/errorResponse';

const {
  Order, OrderDetail, Product, ShoppingCart
} = Model;

/**
 *
 *
 * @export
 * @class OrderController
 * @description Operations on Order
 */
export default class OrderController {
  /**
    * @description -This method creates an order
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {integer} - order_id
    */
  static async createOrder(req, res) {
    const {
      cart_id: cartId,
      shipping_id: shippingId,
      tax_id: taxId
    } = req.body;
    try {
      const cartItems = await ShoppingCart.findAll({
        where: { cart_id: cartId },
        attributes: [
          'item_id',
          'product_id',
          'attributes',
          'quantity'
        ],
        include: [{
          model: Product,
          attributes: [
            'name',
            'price',
            'discounted_price',
          ]
        }]
      });
      if (!cartItems.length) {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Cart id does not exist',
            field: 'cart id'
          }
        });
      }
      let totalAmount = 0;
      for (let i = 0; i < cartItems.length; i += 1) {
        const unitCost = (cartItems[i].dataValues.Product.price * cartItems[i].dataValues.quantity)
        - (cartItems[i].dataValues.Product.discounted_price * cartItems[i].dataValues.quantity)
          .toFixed(2).toString();
        totalAmount += unitCost;
      }
      const order = await Order.create({
        total_amount: totalAmount,
        created_on: new Date().toLocaleString(),
        status: 0,
        customer_id: req.user.id,
        shipping_id: shippingId,
        tax_id: taxId
      });
      cartItems.forEach(async (itemDetails) => {
        await OrderDetail.create({
          order_id: order.dataValues.order_id,
          product_id: itemDetails.product_id,
          attributes: itemDetails.dataValues.attributes,
          product_name: itemDetails.dataValues.Product.name,
          quantity: itemDetails.quantity,
          unit_cost: itemDetails.dataValues.Product.price
        });
      });
      await ShoppingCart.destroy({
        where: { cart_id: cartId }
      });
      res.status(200).json({
        orderId: order.order_id
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(errorResponse(req, res, 500, 'ORD_500', error.parent.sqlMessage, ''));
    }
  }
}
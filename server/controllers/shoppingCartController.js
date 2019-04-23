import generateUniqueId from '../helpers/generateUniqueId';
import Model from '../models';
import formatCartItems from '../helpers/formatCartItems';

const {
  ShoppingCart, Product
} = Model;


/**
 *
 *
 * @export
 * @class ShoppingCartControlle
 * @description Operations on Products
 */
export default class ShoppingCartController {
  /**
    * @description -This method generates a unique id
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - unique id
    */
  static async generateUniqueId(req, res) {
    try {
      const uniqueId = generateUniqueId(18);
      if (uniqueId) {
        res.status(200).json({ cart_id: uniqueId });
      } else {
        res.status(400).json({ message: 'Bad Request' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Bad Request' });
    }
  }

  /**
    * @description -This method gets products in cart
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {array} - cart products
    */
  static async getProductsInCart(req, res) {
    try {
      const { cart_id: cartId } = req.params;
      const cartItems = await ShoppingCart.findAll({
        where: { cart_id: cartId },
        attributes: [
          'item_id',
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
      const formattedCartItems = formatCartItems(cartItems);
      if (!formattedCartItems.length) {
        res.status(200).json({ cart: formattedCartItems, message: 'No products in cart' });
      } else {
        res.status(200).json(formattedCartItems);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

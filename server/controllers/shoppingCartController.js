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
        res.status(200).json({ cart: formattedCartItems, message: 'Cart id does not exist' });
      } else {
        res.status(200).json(formattedCartItems);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  /**
    * @description -This method adds a  product to cart
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {array} - adds a product to cart
    */
  static async addProductToCart(req, res) {
    try {
      const {
        cart_id: cartId,
        product_id: productId,
        attributes
      } = req.body;
      const product = await Product.findOne({
        where: { product_id: productId },
      });
      if (product) {
        const existingCart = await ShoppingCart.findOne({
          where: { cart_id: cartId, product_id: productId, attribute: attributes },
        });
        if (!existingCart) {
          await ShoppingCart.create({
            cart_id: cartId,
            product_id: productId,
            quantity: 1,
            added_on: '2019-04-22 22:00:23',
            attribute: attributes,
          });
        } else {
          const newQuantity = existingCart.quantity + 1;
          await existingCart.update({
            cart_id: cartId,
            product_id: productId,
            quantity: newQuantity,
            added_on: '2019-04-22 22:00:23',
            attribute: attributes,
          });
        }
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
        res.status(200).json(formattedCartItems);
      } else {
        res.status(404).json({ cart: [], message: 'Product cannot be found' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

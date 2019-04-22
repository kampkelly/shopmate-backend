import generateUniqueId from '../helpers/generateUniqueId';

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
}

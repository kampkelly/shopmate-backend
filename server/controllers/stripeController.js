import 'dotenv/config';
import stripe from 'stripe';

const keySecret = process.env.STRIPE_SECRET_KEY;
const Stripe = stripe(keySecret);

/**
 *
 *
 * @export
 * @class StripeControlle
 * @description Payment with stripe
 */
export default class StripeController {
  /**
    * @description -This method charges on stripe
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - charge and message
    */
  static async payWithStripe(req, res) {
    const {
      stripeToken, order_id: orderId, description, amount, currency
    } = req.body;
    const { email } = req.user;
    try {
      const customer = await Stripe.customers.create({
        email,
        source: stripeToken
      });
      const charge = await Stripe.charges.create({
        amount,
        description,
        currency,
        customer: customer.id,
        metadata: { order_id: orderId },
      });
      res.status(200).json({ charge, message: 'Payment processed' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

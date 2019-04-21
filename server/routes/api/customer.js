import express from 'express';
import CustomerController from '../../controllers/customerController';
import customerValidator from '../../middlewares/customerValidator';

const { loginValidator, registerValidator } = customerValidator;

const router = express.Router();
router.post('/customers', registerValidator, CustomerController.RegisterCustomer);
router.post('/customers/login', loginValidator, CustomerController.LoginCustomer);

export default router;

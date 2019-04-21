import express from 'express';
import CustomerController from '../../controllers/customerController';
import customerValidator from '../../middlewares/customerValidator';

const { registerValidator } = customerValidator;

const router = express.Router();
router.post('/customers', registerValidator, CustomerController.RegisterCustomer);
router.post('/customers/login', CustomerController.LoginCustomer);

export default router;

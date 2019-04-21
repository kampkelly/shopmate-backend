export default {
  registerValidator(req, res, next) {
    const { email, name, password } = req.body;
    const errors = [];
    if (!email) errors.push('Email is required');
    if (!name) errors.push('Name is required');
    if (!password) errors.push('Password is required');
    if (typeof email !== 'string') errors.push('Email must be a string');
    if (typeof name !== 'string') errors.push('Name must be a string');
    if (typeof password !== 'string') errors.push('Password must be a string');
    if (password.length < 6) errors.push('Password must be at least 6 characters');
    if (!errors.length) {
      return next();
    }
    if (errors.length) res.status(400).json({ message: errors });
  }
};

import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default {
  generateToken(user) {
    const token = jwt.sign({ user }, process.env.JWTKEY, {
      expiresIn: process.env.TOKEN_EXPIRATION
    });
    return token;
  },

  confirmToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
      res.status(403).json({ success: false, message: 'Missing Token' });
    } else {
      if (token.split(' ')[0] !== 'Bearer') {
        res.status(403).json({ success: false, message: 'Invalid token supplied' });
      }
      // eslint-disable-next-line
      token = token.split(' ')[1];
      jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
        if (err) {
          if (err.message.includes('signature')) {
            res.status(403).json({ success: false, message: 'Invalid token supplied' });
          } else {
            res.status(403).json({ success: false, message: err });
          }
        }
        req.user = decoded.user;
        next();
      });
    }
  }
};

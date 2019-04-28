import jwt from 'jsonwebtoken';
import 'dotenv/config';
import errorResponse from '../helpers/errorResponse';

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
      return res.status(403).json(errorResponse(req, res, 403, 'AUT_01', ' Authorization code is empty', ''));
    }
    if (token.split(' ')[0] !== 'USER-KEY') {
      return res.status(403).json(errorResponse(req, res, 403, 'AUT_03', 'Invalid token supplied', ''));
    }
    // eslint-disable-next-line
    token = token.split(' ')[1];
    jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
      if (err) {
        if (err.message.includes('signature')) {
          return res.status(403).json(errorResponse(req, res, 403, 'AUT_03', 'Invalid token supplied', ''));
        }
        return res.status(403).json(errorResponse(req, res, 403, 'AUT_03', err.message, ''));
      }
      req.user = decoded.user;
      next();
    });
  }
};

/* eslint use-isnan: "error" */
/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
import errorResponse from '../helpers/errorResponse';

export default {
  validateQueryParams(req, res, next) {
    const {
      description_length: descriptionLength, limit, page
    } = req.query;
    const errors = [];
    if (descriptionLength) {
      if (isNaN(descriptionLength)) errors.push('Description length must be a number');
    }
    if (limit) {
      if (isNaN(limit)) errors.push('Limit must be a number');
    }
    if (page) {
      if (isNaN(page)) errors.push('Page must be a number');
    }
    if (errors.length) {
      return res.status(400).json(errorResponse(req, res, 400, 'USR_04', errors, ''));
    }
    next();
  }
};

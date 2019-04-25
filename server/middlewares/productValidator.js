/* eslint use-isnan: "error" */
/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

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
      errors.push('');
      res.status(400).json({
        error: {
          status: 400,
          code: 'USR_04',
          message: errors,
          field: ''
        }
      });
    } else {
      next();
    }
  }
};

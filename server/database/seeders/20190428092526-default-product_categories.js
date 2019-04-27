'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('product_category', [
      { product_id: 1, category_id: 1 },
      { product_id: 2, category_id: 1 },
      { product_id: 3, category_id: 2 }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('product_category', null, {});
  }
};

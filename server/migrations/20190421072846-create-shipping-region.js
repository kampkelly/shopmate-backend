
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('shipping_regions', {
    shipping_region_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    shipping_region_: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }),
  down: queryInterface => queryInterface.dropTable('shipping_regions')
};

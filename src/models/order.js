'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    buyerName: DataTypes.STRING,
    finalPrice: DataTypes.INTEGER
  }, {});
  Order.associate = function (models) {
    // associations can be defined here
  };
  return Order;
};
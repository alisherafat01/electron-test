'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    OrderId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    unitPrice: DataTypes.INTEGER,
    finalPrice: DataTypes.INTEGER
  }, {});
  OrderItem.associate = function (models) {
    // associations can be defined here
  };
  return OrderItem;
};
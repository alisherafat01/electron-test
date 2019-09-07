'use strict';
const models = require('../models');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Product.bulkCreate([
      {
        name: 'پیتزا پلاس ژامبون استیک',
        description: 'پیتزای پنجره ای که 4 برش وسط ژامبون استیک میباشد',
        price: 40500,
        image: 'https://static.snapp-food.com/200x201/cdn/86/04/product_image/zoodfood/5b98ec4db92cd.jpg'
      },
      {
        name: 'پیتزا پپرونی',
        description: 'پپرونی، قارچ، سس و پنیر مخصوص پرپروک',
        price: 36500,
        image: 'https://static.snapp-food.com/200x201/cdn/86/04/product_image/zoodfood/582726546522e.jpg'
      },
      {
        name: 'سالاد سزار',
        description: 'کاهو، نان تست، مرغ گریل شده، پنیر پارمسان، سس مخصوص',
        price: 22000,
        image: 'https://static.snapp-food.com/200x201/cdn/86/04/product_image/zoodfood/5b5eb3f508929.jpg'
      }
    ]);

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

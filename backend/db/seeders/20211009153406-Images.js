'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
    {
     title: 'Foot on ball',
     keywords: "ball, cleat, person",
     image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737077/soccr/nike_tckyg5.jpg',
     user_id: 1
    },
    {
      title: 'Vincente Calderon',
      keywords: "stadium, fans, field",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737082/soccr/vincente_bozfvt.jpg',
      user_id: 1
     },
     {
      title: 'Shot in Motion',
      keywords: "person, ball",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737080/soccr/quickshot_zx5by0.jpg',
      user_id: 1
     },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};

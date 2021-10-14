'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('AlbumContents', [
     {
     album_id: 1,
     image_id: 4
     },
     {
      album_id: 1,
      image_id: 6
      },
      {
       album_id: 1,
       image_id: 8
      }
       ,
      {
       album_id: 2,
       image_id: 7,
      },
      {
       album_id: 1,
       image_id: 2
       }
       ,
      {
       album_id: 1,
       image_id: 15
       }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('AlbumContents', null, {});
  }
};

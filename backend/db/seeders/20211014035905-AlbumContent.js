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
      image_id: 9
      },
      {
       album_id: 1,
       image_id: 13
      },
      {
        album_id: 1,
        image_id: 19
      },
      {
        album_id: 1,
        image_id: 25
      },
      {
       album_id: 2,
       image_id: 2,
      },
      {
       album_id: 2,
       image_id: 5
      },
      {
       album_id: 2,
       image_id: 13
      },
      {
       album_id: 2,
       image_id: 14
      },
      {
       album_id: 2,
       image_id: 11
      },
      {
       album_id: 2,
       image_id: 8
      },
      {
       album_id: 3,
       image_id: 1
      },
      {
       album_id: 3,
       image_id: 12
      },
      {
       album_id: 3,
       image_id: 7
      },
      {
       album_id: 3,
       image_id: 26
      },
      {
       album_id: 3,
       image_id: 21
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

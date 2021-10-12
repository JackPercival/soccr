'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
    {
     user_id: 1,
     image_id: 1,
     comment: "Looks so good!"
    },
    {
      user_id: 1,
      image_id: 1,
      comment: "I wish I had those cleats"
     },
     {
      user_id: 2,
      image_id: 1,
      comment: "Seriously love this photo. The ball colors are so cool!"
     },
     {
      user_id: 1,
      image_id: 2,
      comment: "I wish I was there! Beautiful photo."
     },
     {
       user_id: 2,
       image_id: 2,
       comment: "Throwback to their old stadium. The new one just doesn't compare."
      },
      {
        user_id: 2,
        image_id: 3,
        comment: "Love the action in this photo. Great shot!"
       },
      {
       user_id: 3,
       image_id: 4,
       comment: "Iniesta is such a baller. He was so good in that tournament."
      },
      {
        user_id: 1,
        image_id: 4,
        comment: "Yeah, that guy has got to be in the Top 5 Greatest Midfielders of all time! Truly a special player."
       },
       {
        user_id: 1,
        image_id: 4,
        comment: "Iniesta and Xavi... I sure do miss those two bossing the midfield with Busquets. How Barcelona has fallen..."
       },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};

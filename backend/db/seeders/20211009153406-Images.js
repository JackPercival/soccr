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
     description: "ball, cleat, person",
     image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737077/soccr/nike_tckyg5.jpg',
     user_id: 1
    },
    {
      title: 'Vincente Calderon',
      description: "stadium, fans, field",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737082/soccr/vincente_bozfvt.jpg',
      user_id: 1
     },
     {
      title: 'Shot in Motion',
      description: "person, ball",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737080/soccr/quickshot_zx5by0.jpg',
      user_id: 1
     },
     {
      title: 'Iniesta vs Italy',
      description: "Iniesta dominating the midfield against Italy during Euro 2012. An outstanding player on top of his game, as five Italians struggle to get the ball from him.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1200/v1634068114/soccr/iniesta_abfeku.jpg',
      user_id: 1
     },
     {
      title: 'Practice Time',
      description: "person, ball, field",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737080/soccr/practice_f0bxem.jpg',
      user_id: 1
     },
     {
      title: 'Stack of balls',
      description: "ball, field",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_734/v1633737045/soccr/ballstack_xg9h0u.jpg',
      user_id: 2
     },
     {
      title: "Bird's Eye View",
      description: "stadium",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_508/v1633737045/soccr/arial_xle7us.jpg',
      user_id: 2
     },
     {
      title: "Camp Nou",
      description: "stadium, fans",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1102/v1633737046/soccr/campnou_yod1kh.jpg',
      user_id: 2
     },
     {
      title: "Signal Iduna Park",
      description: "stadium, fans",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1099/v1633737049/soccr/bvb_cgbyxk.jpg',
      user_id: 2
     },
     {
      title: "Bycycle Kick",
      description: "person, ball",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1168/v1633737050/soccr/bike_hwn1my.jpg',
      user_id: 2
     },
     {
      title: "Orange Cleat",
      description: "cleat",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1188/v1633737052/soccr/boot_erqo3w.jpg',
      user_id: 2
     },
     {
      title: "Coaching 101",
      description: "person, field",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1116/v1633737055/soccr/coach_nnnkgh.jpg',
      user_id: 2
     },
     {
      title: "Soccer Cones",
      description: "person, field, ball",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_725/v1633737056/soccr/cones_dyvkqo.jpg',
      user_id: 2
     },
     {
      title: "Chang Arena",
      description: "person, field, fans, stadium",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1163/v1633737059/soccr/crave_bqygfz.jpg',
      user_id: 2
     },
     {
      title: "Pitch Side at Camp Nou",
      description: "stadium, fans, field",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1200/v1633737060/soccr/barca_xxluzb.jpg',
      user_id: 2
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

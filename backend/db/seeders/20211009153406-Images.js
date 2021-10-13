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
     description: "Colorful cleats and a colorful ball.",
     image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737077/soccr/nike_tckyg5.jpg',
     user_id: 3
    },
    {
      title: 'Vincente Calderon',
      description: "Atletico's old stadium, the Vincente Calderon, packed to the brim with fans.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737082/soccr/vincente_bozfvt.jpg',
      user_id: 1
     },
     {
       title: 'Shot in Motion',
       description: "Tried to capture the sport in the moment between two players and one ball.",
       image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737080/soccr/quickshot_zx5by0.jpg',
       user_id: 2
      },
      {
       title: 'Iniesta vs Italy',
       description: "Iniesta dominating the midfield against Italy during Euro 2012. An outstanding player on top of his game, as five Italians struggle to get the ball from him.",
       image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1200/v1634068114/soccr/iniesta_abfeku.jpg',
       user_id: 1
      },
     {
      title: 'Stack of balls',
      description: "The calm before practice, as all the balls are organized neatly on the field.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_734/v1633737045/soccr/ballstack_xg9h0u.jpg',
      user_id: 2
     },
     {
      title: "Messi",
      description: "Lionel Messi, the greatest player ever, celebrating after a final minute goal against Real Madrid. Showing his Barcelona jersey to the fans, while he stands alone on the field.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737875/soccr/goatjersey_ah03r9.jpg',
      user_id: 3
     },
     {
      title: "Bird's Eye View",
      description: "Drone shot of my local stadium.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_508/v1633737045/soccr/arial_xle7us.jpg',
      user_id: 2
     },
     {
      title: "Camp Nou",
      description: "Nothing beats a packed stadium full of fans chanting for Barcelona. Not a bad view of the field.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1102/v1633737046/soccr/campnou_yod1kh.jpg',
      user_id: 2
     },
     {
      title: "Signal Iduna Park",
      description: "The best fans in the world at this stadium. Dortmund fans are nuts!",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1099/v1633737049/soccr/bvb_cgbyxk.jpg',
      user_id: 2
     },
     {
      title: "Van Persie Diving Header",
      description: "Robin van Persie's famous diving header in the 2014 World Cup against Spain. Great player on the biggest stage.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1633737875/soccr/percy_ys5kor.jpg',
      user_id: 2
     },
     {
      title: "Orange Cleat",
      description: "Simple colorful cleat",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1188/v1633737052/soccr/boot_erqo3w.jpg',
      user_id: 2
     },
     {
      title: "Corner Kick",
      description: "Lovely angle of a corner kick. So many players on the field focused on a single ball.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1200/v1633737063/soccr/corner_ilho8h.jpg',
      user_id: 3
     },
     {
      title: "Soccer Cones",
      description: "The coach lining up cones and a ball for practice. I love the contrast between the green field and orange cones.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_725/v1633737056/soccr/cones_dyvkqo.jpg',
      user_id: 2
     },
     {
      title: "Chang Arena",
      description: "Who knew Thailand had such cool stadiums (and great fans). Highly recommend catching a game here. Every seat offers a great view of the field. The clouds made for a beautful scene.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1163/v1633737059/soccr/crave_bqygfz.jpg',
      user_id: 2
     },
     {
      title: "Pitch Side at Camp Nou",
      description: "Best seat in the world. I could see the grass growing on the field. The players are so much faster up close.",
      image_url: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1200/v1633737060/soccr/barca_xxluzb.jpg',
      user_id: 3
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

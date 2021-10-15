'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
        profile_pic: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634168909/soccr/WhiteCrestTN_oizp1h.jpg'
      },
      {
        email: faker.internet.email(),
        username: 'JackPercival',
        hashedPassword: bcrypt.hashSync('password'),
        profile_pic: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634139516/soccr/barcabadge_bzcfgk.png',
        banner_pic: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1102/v1633737046/soccr/campnou_yod1kh.jpg'
      },
      {
        email: faker.internet.email(),
        username: 'JuliaRose',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: 'Soccer4Life',
        hashedPassword: bcrypt.hashSync('password'),
        profile_pic: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634338784/soccr/manu_gilzcw.png',
        banner_pic: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1004/v1633734639/soccr/night_rkarsr.jpg'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};

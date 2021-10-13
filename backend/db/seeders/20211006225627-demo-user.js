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
        profile_pic: 'https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634139516/soccr/barcabadge_bzcfgk.png'
      },
      {
        email: faker.internet.email(),
        username: 'BradSimpson',
        hashedPassword: bcrypt.hashSync('password'),
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

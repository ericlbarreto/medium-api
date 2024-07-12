'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id from Users;',
    );

    const userRows = users[0];

    const posts = Array.from({ length: 14 }).map(() => ({
      title: faker.lorem.sentence(6),
      content: faker.lorem.paragraphs(3),
      user_id: userRows[Math.floor(Math.random() * userRows.length)].id,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert('posts', posts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  }
};

'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id from Users;',
    );

    const userRows = users[0];

    const posts = Array.from({ length: 15 }).map(() => ({
      title: faker.lorem.words(3), // Gera um título aleatório com 3 palavras
      content: faker.lorem.paragraphs(3), // Gera conteúdo aleatório com 3 parágrafos
      userId: userRows[Math.floor(Math.random() * userRows.length)].id, // Associa um usuário aleatório
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('posts', posts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  }
};

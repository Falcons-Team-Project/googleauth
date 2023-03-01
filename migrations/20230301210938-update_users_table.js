'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'userName', 'username');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'username', 'userName');
  },
};

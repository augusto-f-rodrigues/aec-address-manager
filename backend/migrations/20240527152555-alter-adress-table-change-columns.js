'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('address', 'cep', 'zip_code');
    await queryInterface.renameColumn('address', 'uf', 'state');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('address', 'zip_code', 'cep');
    await queryInterface.renameColumn('address', 'state', 'uf');
  }
};

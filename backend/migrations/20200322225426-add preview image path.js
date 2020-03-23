'use strict';
const tableName = 'Videos';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const migrations = [];
    const updateCategoryField = (transaction) => queryInterface.describeTable(tableName)
      .then((tableDefinition) => {
        if (!tableDefinition.directory) {
          migrations.push(queryInterface.addColumn('Videos', 'directory', Sequelize.TEXT, { transaction }));
        }
        if (!tableDefinition.preview) {
          migrations.push(queryInterface.addColumn('Videos', 'preview', Sequelize.TEXT, { transaction }));
        }
        if (!tableDefinition.deleted) {
          migrations.push(queryInterface.addColumn('Videos', 'deleted', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          }, {
            transaction,
          }));
        }
      });
    return queryInterface.sequelize
      .transaction((transaction) => updateCategoryField(transaction)
        .then(() => Promise.all(migrations)));
  },

  down: (queryInterface, Sequelize) => {
    const migrations = [];
    const undoUpdateCategoryField = (transaction) => queryInterface.describeTable(tableName)
      .then((tableDefinition) => {
        if (tableDefinition.directory) {
          migrations.push(queryInterface.removeColumn('Videos', 'directory', {transaction}));
        }
        if (tableDefinition.preview) {
          migrations.push(queryInterface.removeColumn('Videos', 'preview', {transaction}));
        }
        if (tableDefinition.deleted) {
          migrations.push(queryInterface.removeColumn('Videos', 'deleted', {transaction}));
        }
      });

    return queryInterface.sequelize
      .transaction((transaction) => undoUpdateCategoryField(transaction)
        .then(() => Promise.all(migrations)));
  }
};

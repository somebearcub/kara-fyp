// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const responses = sequelizeClient.define('responses', {
    rText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    consultationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  responses.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    responses.belongsTo(models.question, {
      foreignKey: 'questionId',
    });

    responses.belongsTo(models.users, {
      foreignKey: 'userId',
    });

    responses.belongsTo(models.consultation, {
      foreignKey: 'consultationId',
    });
  };

  return responses;
};

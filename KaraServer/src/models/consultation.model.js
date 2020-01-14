// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const consultation = sequelizeClient.define('consultation', {
    cTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    pushNotification: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    submitted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  consultation.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    consultation.hasMany(models.responses, {
      foreignKey: 'consultationId',
    })
  };

  return consultation;
};

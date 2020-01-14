// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    familyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    givenName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '1900-01-01',
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ethnicGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    employmentStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },

    fPregnancy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    picture: {
      type: DataTypes.STRING,
    },

    facebookId: { type: Sequelize.STRING },

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.hasMany(models.responses, {
      foreignKey: 'userId',
    })
  };

  return users;
};

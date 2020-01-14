// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const question = sequelizeClient.define('question', {
    //Header
    qName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //Description
      //String is 255 char
    qDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    //For backend purposes
    additionalNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    //For Sorting Backend
    questionCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //To configure what type of component is shown later
    questionComponent: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    question_details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },

    {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
  });

  // eslint-disable-next-line no-unused-vars
  question.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    question.hasMany(models.responses, {
      foreignKey: 'questionId',
    })

    question.belongsTo(models.consultation, {
      foreignKey: 'consultationId',
    });

  };

  return question;
};

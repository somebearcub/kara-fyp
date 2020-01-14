const users = require('./users/users.service.js');
const consultation = require('./consultation/consultation.service.js');
const question = require('./question/question.service.js');
const responses = require('./responses/responses.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(consultation);
  app.configure(question);
  app.configure(responses);
};

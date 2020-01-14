const {authenticate} = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [
      // authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [
      async context => {
       if (context.params.file) {
          context.data.picture = "/images/consultations/" + context.params.file.filename;
        }
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [
      async context => {
        for (let i in context.result.data) {
          context.result.data[i].question_count = (await context.app.service('question').find({query: {consultationId: context.result.data[i].id}})).total;
        }
      },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

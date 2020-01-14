const {authenticate} = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [
      // authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [
      // A hook function to do anything here
      async context => {
        /**
         * @var {HookContext} context
         */

        // Checksif the context.data.question_details i.e. the question_details field, is an object
        if (typeof context.data.question_details === 'object') {
          // This is to convert the question_details, if received as object, to convert to a string to save to the database
          // Processes the js object received into STRING
          context.data.question_details = JSON.stringify(context.data.question_details);
        }
      },
    ],
    update: [

      async context => {
        /**
         * @var {HookContext} context
         */

        // This is to convert the question_details, if received as object, to convert to a string to save to the database
        if (typeof context.data.question_details === 'object') {
          context.data.question_details = JSON.stringify(context.data.question_details);
        }
      },
    ],
    patch: [

      async context => {
        /**
         * @var {HookContext} context
         */

        // This is to convert the question_details, if received as object, to convert to a string to save to the database
        if (typeof context.data.question_details === 'object') {
          context.data.question_details = JSON.stringify(context.data.question_details);
        }
      },
    ],
    remove: [],
  },

  after: {
    all: [],
    find: [
      context => {
        context.result.data = context.result.data.map(item => {
          if (typeof item.question_details === 'string') {
            item.question_details = JSON.parse(item.question_details);
          }

          return item;
        })
      },
    ],
    get: [context => {
      if (typeof item.question_details === 'string') {
        context.result.question_details = JSON.parse(item.question_details);
      }
    }],
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

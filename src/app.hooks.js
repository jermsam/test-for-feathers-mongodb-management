// Application hooks that run for every service
const { NotFound,  } = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [
      hook =>{
        if (hook.app.get('disabledServices').includes(hook.path)) {
          throw new NotFound('Service not available');
        }
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

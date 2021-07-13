// Initializes the `organisations` service on path `/organisations`

const { Organisations } = require('./organisations.class');
const hooks = require('./organisations.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/organisations', new Organisations(options, app));



  // Get our initialized service so that we can register hooks
  const service = app.service('organisations');

  service.hooks(hooks);
};

// Initializes the `looking` service on path `/looking`
const { Looking } = require('./looking.class');
const hooks = require('./looking.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/looking', new Looking(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('looking');

  service.hooks(hooks);
};

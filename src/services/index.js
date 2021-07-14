const organisations = require('./organisations/organisations.service.js');
const looking = require('./looking/looking.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(organisations);
  app.configure(looking);

};

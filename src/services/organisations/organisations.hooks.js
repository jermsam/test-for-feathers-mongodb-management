const plugin = require('feathers-mongodb-management');

function createOrganisationDB (hook) {
  return hook.app.service('databases').create({
    name: hook.result._id.toString()
  })
    .then(() => {

      console.log('DB created for organisation ' + hook.result.name);
      return hook;
    });
}
function removeOrganisationDB (hook) {
  return hook.app.service('databases').remove(hook.result._id.toString())
    .then(() => {

      console.log('DB removed for organisation ' + hook.result.name);
      return hook;
    });
}


function createOrganisationServices (hook){
  let db = hook.app.get('client').db(hook.result._id.toString());
  // Now create services binded to this database to manage collections/users
  hook.app.use('/'+hook.result._id.toString() + '/collections', plugin.collection({ db }));
  // hook.app.use('/'+hook.result._id.toString() +'/users', plugin.user({ db }));
  return hook;
}


// Hook populating disabled services when an organisation is removed
function removeOrganisationServices (hook) {
  hook.app.set('disabledServices',[...hook.app.get('disabledServices'),hook.result._id.toString() + '/assets']);
}



module.exports = {
  before: {
    all: [],
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
    create: [createOrganisationDB,createOrganisationServices],
    update: [],
    patch: [],
    remove: [removeOrganisationDB,removeOrganisationServices]
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

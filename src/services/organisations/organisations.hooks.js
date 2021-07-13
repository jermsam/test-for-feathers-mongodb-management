
const mongoManager = require('feathers-mongodb-management');


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

function createOrganisationService (hook){
  let db = hook.app.get('client').db(hook.result._id.toString());
  console.log('Creating Service ..... ',hook.result._id.toString() + '/assets');
  // Now create services binded to this database to manage collections/users
  hook.app.use(hook.result._id.toString() + '/assets', mongoManager.collection({ db }));

  console.log('Created Service ',hook.result._id.toString() + '/assets');
  return hook;
}


// Hook populating disabled services when an organisation is removed
function removeOrganisationService (hook) {
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
    create: [createOrganisationDB,createOrganisationService],
    update: [],
    patch: [],
    remove: [removeOrganisationDB,removeOrganisationService]
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

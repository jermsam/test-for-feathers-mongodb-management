
// Hooks to manage DB linked to an organisation


const MongoClient = require('mongodb').MongoClient;

const mongoManager = require('feathers-mongodb-management');

module.exports =  function (app) {
  const connection = app.get('mongodb');
  const database =  connection.substr(connection.lastIndexOf('/') + 1);
  // Connect to the DB at startup
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(
      client => {
        app.set('client',client);
        // console.log(client);
        // Create the service to manage DBs
        //app.use('/databases', mongoManager.database({ db: app.db }));
        app.use('/databases', mongoManager.database({ adminDb: client.db('super').admin(), client }));
        return client.db(database);
      }).catch(err=>{
      console.error('ERR: ',err);
    });

  app.set('mongoClient', mongoClient);


};

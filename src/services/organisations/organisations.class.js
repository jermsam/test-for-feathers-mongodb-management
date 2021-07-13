const { Service } = require('feathers-mongodb');

exports.Organisations = class Organisations extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('organisations');
    });
  }
};

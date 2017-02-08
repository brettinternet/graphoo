const winston = require('../services/winston'),
      pouchdb = require('../db/pouchdb');

exports.destroyPouchDb = (req, response) => {
  pouchdb.destroy()
    .then(() => {
      response.status(200).send();
      winston.log.warn('PouchDB/CouchDB database has been deleted by the user.')
    })
    .catch(err => {
      winston.log.err('Could not delete PouchDB/CouchDB database...', err);
      response.status(504).send(err);
    });
}

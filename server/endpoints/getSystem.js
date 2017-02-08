const winston = require('../services/winston'),
      app = require('../index'),
      system = require('../controllers/system'),
      request = require('request'),
      db = app.get('db');

let xouchdbUrl = (app.locals.settings.config.db.couchdb.ssl ? 'https://' : 'http://') +app.locals.settings.config.db.couchdb.host+ ':' + (app.locals.settings.config.db.couchdb.status ? app.locals.settings.config.db.couchdb.port : app.locals.settings.config.port).toString() + (app.locals.settings.config.db.pouchdb.status ? '/pouch/' : '/') + (app.locals.settings.config.db.couchdb.dbname ? app.locals.settings.config.db.couchdb.dbname : 'graphicdb');

exports.getSystemInfo = (req, response) => {
  system.getSystemInfo()
    .then(res => {
      response.status(200).send(res);
    })
    .catch(err => {
      winston.log.error('Error getting system information...', err);
      response.status(500).send(err);
    });
}

exports.getBatteryData = (req, response) => {
  let module = 'battery';
  if (!app.locals.settings.config.modules.battery.status) {
    response.status(200).send('Cannot GET...', module, 'data is turned off.');
  } else if (app.locals.settings.config.db.pouchdb.status || app.locals.settings.config.db.couchdb.status) {
    let dbUrl = xouchdbUrl +'/_design/' + module + '/_view/' + req.params.time;
    request.get(dbUrl, (err, res) => {
      if (err) winston.log.error('Error getting', module, 'from PouchDB/CouchDB...', err);
      winston.log.info('Data retreived from PouchDB/CouchDB for', module);
      response.status(200).send(res);
    });
  } else if (app.locals.settings.config.db.postgres.status) {
    db.run(postgres.getQuery(req.params.time), [module+'%'], (err, res) => {
      if (err) {
        winston.log.error('Error getting', module, 'from Postgres...', err);
        response.status(504).send(err);
      }
      winston.log.info('Data retreived from PostgreSQL for', module);
      response.status(200).send(res);
    });
  }
}

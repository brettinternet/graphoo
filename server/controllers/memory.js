const si = require('systeminformation'),
      winston = require('../services/winston'),
      app = require('../index'),
      db = app.get('db'),
      pdb = require('../db/pouchdb');

setInterval(() => {
  let module = 'memory';
  if (app.locals.settings.config.modules.memory.status) {
    si.mem()
        .then(data => {
          if (app.locals.settings.config.db.pouchdb.status || app.locals.settings.config.db.couchdb.status) {
            let obj = {};
            obj.time = new Date().getTime();
            obj.name = module;
            obj.value = data;
            pdb.store(obj);
          }
          if (app.locals.settings.config.db.postgres.status) {
            for (let prop in data) {
              if (data.hasOwnProperty(prop)) {
                let values = {
                  name: module +'.'+ prop,
                  value: data[prop]
                }
                db.graphicdb.insert(values, (err, article) => {
                  if (err) winston.log.error(err);
                });
              }
            }
          }
        })
        .catch(error => winston.log.error(error));
  }
}, app.locals.settings.config.modules.memory.interval);

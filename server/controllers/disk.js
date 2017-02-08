const si = require('systeminformation'),
      winston = require('../services/winston'),
      app = require('../index'),
      db = app.get('db'),
      pdb = require('../db/pouchdb');

setInterval(() => {
  let module = 'disk';
  if (app.locals.settings.config.modules.disk.status) {
    si.fsStats()
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
              if (data.hasOwnProperty(prop) && data[prop] > -1) {
                let values = {
                  name: module +'.'+ prop,
                  value: data[prop]
                }
                db.graphicdb.insert(values, (err, article) => {
                  if (err) winston.log.error(err);
                });
              }
              // other DB
            }
          }
        })
        .catch(error => winston.log.error(error));
    si.disksIO()
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
              if (data.hasOwnProperty(prop) && data[prop] > -1) {
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
}, app.locals.settings.config.modules.disk.interval);

setInterval(() => {
  let module = 'diskfs'
  if (app.locals.settings.config.modules.diskfs.status) {
    si.fsSize()
        .then(data => {
          if (app.locals.settings.config.db.pouchdb.status || app.locals.settings.config.db.couchdb.status) {
            let obj = {};
            obj.time = new Date().getTime();
            obj.name = module;
            obj.value = data;
            pdb.store(obj);
          }
          if (app.locals.settings.config.db.postgres.status) {
            data.forEach(el => {
              for (let prop in el) {
                if (el.hasOwnProperty(prop) && prop !== 'fs' && prop !== 'type' && prop !== 'mount') {
                  let values = {
                    name: module +'.'+ prop,
                    value: el[prop]
                  }
                  db.graphicdb.insert(values, (err, article) => {
                    if (err) winston.log.error(err);
                  });
                }
              }
            })
          }
        })
        .catch(error => winston.log.error(error));
  }
}, app.locals.settings.config.modules.diskfs.interval);

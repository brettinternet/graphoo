const si = require('systeminformation'),
      winston = require('../services/winston'),
      os = require('os'),
      app = require('../index'),
      db = app.get('db'),
      smc = require('../services/smc/smc'),
      pdb = require('../db/pouchdb');

let platform = os.type();
setInterval(() => {
  let module = 'temperature';
  if (app.locals.settings.config.modules.temperature.status) {
    if (platform == 'Linux') {
      si.cpuTemperature()
          .then(data => {
            if (app.locals.settings.config.db.pouchdb.status || app.locals.settings.config.db.couchdb.status) {
              let obj = {};
              obj.time = new Date().getTime();
              obj.name = module;
              obj.value = data;
              pdb.store(obj);
            }
            for (let prop in data) {
              if (data.hasOwnProperty(prop) && data[prop] > 0) {
                if (app.locals.settings.config.db.postgres.status) {
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
    } else if (platform == 'Darwin') {
      let smc = require('../services/smc/smc');
      if (app.locals.settings.config.db.pouchdb.status || app.locals.settings.config.db.couchdb.status) {
        let tempObj = smc.metrics,
            newTempObj = {};
        for (var prop in tempObj) {
          if (tempObj.hasOwnProperty(prop)) {
            let tempVal = smc.get(prop);
            if (tempVal > 0) {
              newTempObj[tempObj[prop]] = tempVal;
            }
          }
        }
        let obj = {};
        obj.time = new Date().getTime();
        obj.name = module;
        obj.value = newTempObj;
        pdb.store(obj);
      }
      Object.keys(smc.metrics).forEach(function(key) {
        var value = smc.get(key);
        if (value > 0) {
          if (app.locals.settings.config.db.postgres.status) {
            let values = {
              name: module +'.'+ smc.metrics[key],
              value: value
            }
            db.graphicdb.insert(values, (err, article) => {
              if (err) winston.log.error(err);
            });
          }
        }
      });
    }
  }
}, app.locals.settings.config.modules.temperature.interval);

setInterval(() => {
  let module = 'fan';
  if (app.locals.settings.config.modules.fan.status && platform == 'Darwin') {
    let smc = require('../services/smc/smc');
    let i, f = smc.fans();
    for (i = 0; i < f; i++) {
      if (app.locals.settings.config.db.pouchdb.status || app.locals.settings.config.db.couchdb.status) {
        let data = {};
        data.fan = 'F'+i+'Ac';
        data.rpm = smc.fanRpm(i);
        let obj = {};
        obj.time = new Date().getTime();
        obj.name = module;
        obj.value = data;
        pdb.store(obj);
      }
      if (app.locals.settings.config.db.postgres.status) {
        let values = {
          name: module + '.F'+i+'Ac',
          value: smc.fanRpm(i)
        }
        db.graphicdb.insert(values, (err, article) => {
          if (err) winston.log.error(err);
        });
      }
    }
  }
}, app.locals.settings.config.modules.fan.interval);

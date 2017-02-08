const si = require('systeminformation'),
      os = require('os'),
      winston = require('../services/winston'),
      getip = require('../services/getip'),
      app = require('../index'),
      db = app.get('db'),
      pdb = require('../db/pouchdb');

setInterval(() => {
  let module = 'network';
  if (app.locals.settings.config.modules.network.status) {
    si.networkStats(app.locals.settings.config.modules.network.iface)
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
              if (data.hasOwnProperty(prop) && data[prop] > -1 && prop !== 'iface' && prop !== 'operstate') {
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
    si.inetLatency(app.locals.settings.config.modules.network.ping)
        .then(data => {
          if (app.locals.settings.config.db.pouchdb.status || app.locals.settings.config.db.couchdb.status) {
            let obj = {};
            obj.time = new Date().getTime();
            obj.name = module;
            obj.value = data;
            pdb.store(obj);
          }
          if (app.locals.settings.config.db.postgres.status) {
            let values = {
              name: module +'.latency',
              value: data
            }
            db.graphicdb.insert(values, (err, article) => {
              if (err) winston.log.error(err);
            });
          }
        })
        .catch(error => winston.log.error(error));
  }
}, app.locals.settings.config.modules.network.interval);

setInterval(() => {
  let module = 'netConnections';
  if (app.locals.settings.config.modules.netConnections.status) {
  si.networkConnections()
      .then(data => {
        if (app.locals.settings.config.db.pouchdb.status || app.locals.settings.config.db.couchdb.status) {
          let obj = {};
          obj.time = new Date().getTime();
          obj.name = module;
          obj.value = data;
          pdb.store(obj);
        }
        if (app.locals.settings.config.db.postgres.status) {
          data.forEach((el, i) => {
            for (let prop in el) {
              if (el.hasOwnProperty(prop)) {
                if (prop === 'localport' || prop === 'peerport') {
                  if (prop === 'state') {
                    var status;
                    if (el[prop] === 'ESTABLISHED') {
                      status = 0;
                    } else if (el[prop] === 'LISTEN') {
                      status = 1;
                    } else if (el[prop] === 'CLOSED_WAIT') {
                      status = 2;
                    } else if (el[prop] === 'TIME_WAIT') {
                      status = 3;
                    } else {
                      status = 4;
                    }
                  }
                  if (el[prop] === '*') {
                    el[prop] = 0;
                  }
                  if (prop === 'localport') {
                    var values = {
                      name: module +'.'+ el.protocol +'.'+ el.localaddress + (status ? ('.'+status) : ''),
                      value: el[prop]
                    }
                  } else if (prop === 'peerport') {
                    var values = {
                      name: module +'.'+ el.protocol +'.'+ el.peeraddress + (status ? ('.'+status) : ''),
                      value: el[prop]
                    }
                  }
                  db.graphicdb.insert(values, (err, article) => {
                    if (err) winston.log.error(err);
                  });
                }
                // other DB
              }
            }
          });
        }
      })
      .catch(error => winston.log.error(error));

  }
}, app.locals.settings.config.modules.netConnections.interval);

exports.getPublicIp = getip.v4;
exports.getCheckUrl = si.inetChecksite;

// exports.getPublicIpv6 = getip.v6
// getip.v6().then(ip => console.log(ip));

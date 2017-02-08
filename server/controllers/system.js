const os = require('os'),
      si = require('systeminformation'),
      winston = require('../services/winston'),
      app = require('../index'),
      db = app.get('db'),
      pdb = require('../db/pouchdb');

setInterval(() => {
  let module = 'battery';
  if (app.locals.settings.config.modules.battery.status) {
    si.battery()
        .then(data => {
          if (data.hasbattery) {
            if (app.locals.settings.config.db.pouchdb.status || app.locals.settings.config.db.couchdb.status) {
              let obj = {};
              obj.time = new Date().getTime();
              obj.name = module;
              obj.value = data;
              pdb.store(obj);
            }
            if (app.locals.settings.config.db.postgres.status) {
              for (let prop in data) {
                if (data.hasOwnProperty(prop) && prop !== 'hasbattery') {
                  if (typeof(data[prop]) === 'boolean') {
                    data[prop] = data[prop] ? 1 : 0;
                  }
                  let values = {
                    name: module +'.'+ prop,
                    value: data[prop]
                  }
                  db.graphicdb.insert(values, (err, article) => {
                    if (err) winston.log.error(err);
                    winston.log.info('New data stored in', module)
                  });
                }
              }
            }
          }
        })
        .catch(error => winston.log.error(error));
  }
}, app.locals.settings.config.modules.battery.interval);

exports.getSystemInfo = (callback) => {
  return new Promise((resolve) => {
    let obj = {};
    obj.dev = {};
    obj.disk = {};
    obj.disk.fsSize = {};
    let a = si.users()
        .then(data => obj.users = data)
        .catch(error => winston.log.error(error));

    let b = si.cpu()
        .then(data => obj.cpu = data)
        .catch(error => winston.log.error(error));

    obj.time = si.time();

    // network interfaces (use to change graph data)
    let c = si.networkInterfaces()
        .then(data => obj.interfaces = data)
        .catch(error => winston.log.error(error));

    let d = si.system()
        .then(data => obj.hardware = data)
        .catch(error => winston.log.error(error));

    let e = si.graphics()
        .then(data => obj.graphics = data)
        .catch(error => winston.log.error(error));

    let f = si.osInfo()
        .then(data => obj.osInfo = data)
        .catch(error => winston.log.error(error));


    // disk partitions
    let g = si.fsSize()
      .then(data => {
        obj.disk.fsSize.type = data.type;
        obj.disk.fsSize.mount = data.mount;
      })
      .catch(error => winston.log.error(error));
    let h = si.blockDevices()
      .then(data => obj.disk.blockDevices = data)
      .catch(error => winston.log.error(error));


    // OTHER
    // application
    obj.appUptime = process.uptime();

    // developer
    let i = si.versions() // kernal/node versions
        .then(data => obj.dev.versions = data)
        .catch(error => winston.log.error(error));

    // http://unix.stackexchange.com/questions/43539/what-do-the-flags-in-proc-cpuinfo-mean
    let j = si.cpuFlags()
        .then(data => obj.dev.cpuFlags = data)
        .catch(error => winston.log.error(error));

    Promise.all([a, b, c, d, e, f, g, h, i, j])
      .then(() => {
        resolve(obj);
      })
      .catch(err => {
        winston.log.error('Error resolving promise from System Information...', err);
      });
  });
}

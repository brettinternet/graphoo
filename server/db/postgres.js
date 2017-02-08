const massive = require('massive'),
      app = require('../index'),
      winston = require('../services/winston'),
      request = require('request');

if (app.locals.settings.config.db.postgres.status) {
  if (!app.locals.settings.config.db.postgres.host) winston.log.info('Using default PostgreSQL host.');
  if (!app.locals.settings.config.db.postgres.user) winston.log.info('Using default PostgreSQL user.');
  if (!app.locals.settings.config.db.postgres.dbname) winston.log.info('Using default PostgreSQL database name.');

  let port = app.locals.settings.config.db.postgres.port,
      portString = '';
  if (port !== 5432) portString = ':' + port.toString();
  mConfig = {
    user: app.locals.settings.config.db.postgres.user,
    pass: app.locals.settings.config.db.postgres.pass,
    host: app.locals.settings.config.db.postgres.host,
    dbname: app.locals.settings.config.db.postgres.dbname
  }

  let connectionString = `postgres://${mConfig.user}:${mConfig.pass}@${mConfig.host}${portString}/${mConfig.dbname}`;

  try {
    let createTable = massive.connectSync({
      connectionString: connectionString
    });
    createTable.run("CREATE TABLE IF NOT EXISTS graphicdb(id SERIAL PRIMARY KEY not null, name VARCHAR(100) not null, value DECIMAL, time TIMESTAMP DEFAULT NOW())", (err, res) => {
      if (err) winston.log.error('Could not create/load Postgres table.', err);
      winston.log.info('Postgres table "graphicdb" setup complete.');
    });
  } catch (err) {
    winston.log.error('PostgreSQL database input does not match any database at that address.', err);
    app.locals.settings.config.db.postgres.status = false;
  }

  const massiveInstance = massive.connectSync({
    connectionString: connectionString
  });

  app.set('db', massiveInstance);
  const db = app.get('db');
  let system = require('../controllers/system'),
        cpu = require('../controllers/cpu'),
        memory = require('../controllers/memory'),
        temperature = require('../controllers/temperature'),
        disk = require('../controllers/disk'),
        network = require('../controllers/network');

  exports.getQuery = (time) => {
    if (time === 'all') {
      return "SELECT * FROM graphicdb WHERE name LIKE $1 LIMIT 10000";//+ " ORDER BY time ASC";
    } else if (time === 'today') {
      let a = new Date().getFullYear(),
          b = new Date().getMonth() + 1,
          c = new Date().getDate();
      return "SELECT * FROM graphicdb WHERE name LIKE $1 AND time > '" +a+"-"+b+"-"+c+" 00:00:00'";
    } else if (time === 'lastThreeHours') {
      let a = new Date().getFullYear(),
          b = new Date().getMonth() + 1,
          c = new Date().getDate(),
          d = new Date().getHours() - 3;
      return "SELECT * FROM graphicdb WHERE name LIKE $1 AND time > '" +a+"-"+b+"-"+c+" "+d+":00:00'";
    } else if (time === 'thisMonth') {
      let a = new Date().getFullYear(),
          b = new Date().getMonth() + 1;
      return "SELECT * FROM graphicdb WHERE name LIKE $1 AND time > '" +a+"-"+b+"-01 00:00:00'";
    } else {
      winston.log.error('App requested an unexpected time parameter.');
    }
  }

}

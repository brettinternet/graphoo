const fs = require('fs'),
      colors = require('colors');

const defaultSettings = {
  logLevel: 'warn',
  port: 3000,
  modules: {
    cpu: {status: true, interval: 20000},
    processes: {status: false, interval: 30000}, // TODO: database
    memory: {status: false, interval: 5000},
    temperature: {status: false, interval: 5000},
    fan: {status: false, interval: 5000},
    battery: {status: false, interval: 5000},
    disk: {status: false, interval: 5000},
    diskfs: {status: false, interval: 900*1000},
    network: {status: false, interval: 5000, iface: '', ping: ''},
    netConnections: {status: false, interval: 1800*1000}
  },
  db: {
    rethinkdb: {status: false, host: '', port: '', authKey: '', dbname: ''},
    postgres: {status: false, host: 'localhost', port: 5432, user: 'postgres', pass: '', dbname: 'graphicdb'},
    pouchdb: {status: true},
    couchdb: {status: false, host: 'localhost', port: 5984, dbname: '', ssl: false}
  }
};
const configFile = './server/services/config.json';

if (!fs.existsSync(configFile)) {
  console.log('Config file not found...');
  let saveConfig = JSON.stringify(defaultSettings, null, 4);
  console.log('Writing new config file with default settings...');
  try {
    fs.writeFileSync(configFile, saveConfig);
    console.log('New config file created successfully with default settings...');
  } catch (err) {
    console.error('Could not write new config file...', err);
    appSettings = defaultSettings;
    console.log('Using default settings.');
  }
}

exports.putSettings = (req, res) => {
  const app = require('../index');
  let appSettings = req.body;
  let saveConfig = JSON.stringify(appSettings, null, 4);
  try {
    fs.writeFileSync(configFile, saveConfig);
    res.status(200).send();
    console.log('Settings saved successfully...');
  } catch (err) {
    console.error(`Could not save settings. ${err}`);
    rs.status(504).send(`Could not save settings. ${err}`);
  }
  app.set('config', appSettings);
};

var loadConfig = fs.readFileSync(configFile), appSettings;
try {
  appSettings = JSON.parse(loadConfig);
  console.error('Settings parsed successfully from config file...'.italic.blue);
}
catch (err) {
  console.error(`Error loading settings. Unable to parse config file... ${err}`);
  let saveConfig = JSON.stringify(defaultSettings, null, 4);
  try {
    fs.writeFileSync(configFile, saveConfig);
    console.log('New config file created with default settings.');
    appSettings = defaultSettings;
  } catch (err) {
    console.error('Could not write new config file...', err);
    appSettings = defaultSettings;
    console.log('Using default settings.');
  }
}

exports.getSettings = (req, res) => {
  const app = require('../index');
  res.status(200).send(app.locals.settings.config);
}

exports.config = appSettings;

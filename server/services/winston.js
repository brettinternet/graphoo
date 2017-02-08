const winston = require('winston'),
      fs = require('fs'),
      // app = require('../index'),
      settings = require('./settings');

const logDir = 'logs';
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logLevel = settings.config.logLevel;
// levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
exports.log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      level: 'warn'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/log.log`,
      level: logLevel,
    })
  ]
});

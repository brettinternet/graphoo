const winston = require('../services/winston');

exports.getLogs = (req, response) => {
  let options = {
      from: new Date - 24 * 60 * 60 * 1000,
      until: new Date,
      limit: req.query.limit ? req.query.limit : 20,
      start: 0,
      order: 'desc',
      fields: ['timestamp', 'level', 'message']
    };
  winston.log.query(options, function (err, res) {
    if (err) {
      winston.log.error(err);
      response.status(500).send(err);
    }
    response.status(200).send(res);
  });
}

const path = require('path'),
      express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      winston = require('./services/winston'),
      settings = require('./services/settings'),
      colors = require('colors');

let port = '';
if (!process.env.PORT && settings.config.port && settings.config.port > 1023) {
  port = process.env.PORT = settings.config.port;
} else {
  port = process.env.PORT || 3000;
}

import webpack from 'webpack';
import config from '../webpack.config.development';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { spawn } from 'child_process';

const app = express();
app.set('config', settings.config);
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config),
        wdm = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: false,
    quiet: true,
    stats: {
      colors: true
    }
  });
  app.use(wdm);
  app.use(webpackHotMiddleware(compiler));
  const argv = require('minimist')(process.argv.slice(2));

  const server = app.listen(port, (err) => {
    if (err) return console.error(err);
    if (argv['start-hot']) {
      spawn('npm', ['run', 'start-hot'], { shell: true, env: process.env, stdio: 'inherit' })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    }
    console.log(` Starting GraphicApp server on port ${port} `.bgCyan.black);
  });

  process.on('SIGTERM', () => {
    console.log(' Stopping dev server '.yellow.dim.bgGrey);
    wdm.close();
    server.close(() => {
      process.exit(0);
    });
  });
} else {
  app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(` Starting GraphicApp server on port ${port} `.bgCyan.black);
  });
}

app.use(cors());
app.use(bodyParser.json());
module.exports = app;
const pouchdb = require('./db/pouchdb'),
      postgres = require('./db/postgres'),
      api = require('./controllers/api');

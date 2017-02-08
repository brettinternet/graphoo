const prompt = require('prompt'),
      colors = require('colors'),
      del = require('del');
prompt.message = '';
prompt.delimiter = '';
prompt.get({
  properties: {
    confirm: {
      pattern: /^(yes|no|y|n)$/gi,
      description: ' Are you sure you want to clean up? '.bold.bgRed.black + ' This will clear config files, logs, and PouchDB files.'.magenta,
      message: ' enter (y)es or (n)o '.bold.bgGreen.black,
      required: true,
      default: 'no'
    }
  }
}, (err, result) => {
  let c = result.confirm.toLowerCase();
    if (c!='y' && c!='yes'){
        console.log('\n...'.white + 'ABORT\n'.red);
        return;
    } else {
      del([
        'server/services/config.json',
        'logs/*.json',
        'logs/log.*',
        'npm-debug.log',
        'app/dist',
        'pouch__all_dbs__',
        'graphicdb',
        'graphicdb-*',
        'log.txt',
        '_replicator',
        'app/main.js',
        'app/main.js.map'
      ])
      .then(paths => {
        console.log((paths.length > 0) ? ('\nDeleted files and folders:\n'.underline.yellow + paths.join('\n').white + '\ndone!\n'.random) : '\nNo files to clean up.\n'.italic.dim.white);
      })
    }
});

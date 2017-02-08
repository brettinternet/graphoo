const PouchDB = require('pouchdb'),
      winston = require('../services/winston'),
      app = require('../index'),
      request = require('request');

if (app.locals.settings.config.db.pouchdb.status || app.locals.settings.config.db.couchdb.status) {
  let database = 'graphicdb';
  if (app.locals.settings.config.db.couchdb.status && !app.locals.settings.config.db.pouchdb.status) {
    let couch = app.locals.settings.config.db.couchdb;
    database = (couch.ssl ? 'https://' : 'http://') +couch.host+ ':' + couch.port.toString() +'/'+ (couch.dbname ? couch.dbname : 'graphicdb');
    request.put(database, (err, res, body) => {
      if (err && err === 'file_exists') winston.log.info('Confirmed CouchDB database');
      if (err && err !== 'file_exists') winston.log.error('Could not create CouchDB database...', err);
    });
  }
  winston.log.info('Connecting to', (app.locals.settings.config.db.couchdb.status ? 'CouchDB':'PouchDB'), database);

  if (true) {

  }
  app.use('/pouch', require('express-pouchdb')(PouchDB, {
    logPath: './logs/log.txt',
    overrideMode: {
      exclude: [
        'routes/authentication',
        'routes/authorization',
        'routes/session'
      ]
    }
  }));

  const pdb = new PouchDB(database); // , {auto_compaction: true}

  exports.store = (obj) => {
    pdb.post(obj)
      .then(doc => {
        // console.log(doc);
        // send to sockets?
      })
      .catch(err => {
        winston.log.error('Could not store metric for', obj.name+'...', err);
      });
  }

  let designDocs = ([
    {
    _id: "_design/system",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'system')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'system' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'system' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'system' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'system' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }, {
    _id: "_design/processes",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'processes')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'processes' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'processes' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'processes' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'processes' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }, {
    _id: "_design/battery",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'battery')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'battery' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'battery' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'battery' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'battery' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }, {
    _id: "_design/cpu",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'cpu')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'cpu' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'cpu' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'cpu' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'cpu' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }, {
    _id: "_design/memory",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'memory')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'memory' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'memory' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'memory' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'memory' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }, {
    _id: "_design/disk",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'disk')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'disk' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'disk' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'disk' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'disk' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }, {
    _id: "_design/diskfs",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'diskfs')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'diskfs' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'diskfs' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'diskfs' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'diskfs' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }, {
    _id: "_design/temperature",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'temperature')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'temperature' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'temperature' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'temperature' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'temperature' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }, {
    _id: "_design/fan",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'fan')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'fan' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'fan' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'fan' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'fan' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }, {
    _id: "_design/network",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'network')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'network' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'network' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'network' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'network' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }, {
    _id: "_design/netConnections",
    language: "javascript",
    views: {
      all: {
        map:  function(doc) {
                if (doc.name == 'netConnections')
                  emit(doc.time, doc.value);
              }.toString()
      },
      today: {
        map:  function(doc) {
                var a = new Date().setHours(0,0,0,0);
                if(doc.name == 'netConnections' && doc.time > a)
                  emit(doc.time, doc.value);
              }.toString()
      },
      lastThreeHours: {
        map:  function(doc) {
                var a = new Date().getHours();
                var b = new Date().setHours(a-3);
                if (doc.name == 'netConnections' && doc.time > b)
                  emit(null, doc.value);
              }.toString()
      },
      lastSevenDays: {
        map:  function(doc) {
                var a = new Date().getDate();
                var b = new Date().setDate(a-7);
                if (doc.name == 'netConnections' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      },
      thisMonth: {
        map: function(doc) {
                var a = new Date().setDate(1);
                var b = new Date(a).setHours(0,0,0,0);
                if(doc.name == 'netConnections' && doc.time > b)
                  emit(doc.time, doc.value);
              }.toString()
      }
    }
  }
  ]);

  pdb.bulkDocs(designDocs)
    .then(res => winston.log.info('Verified PouchDB design documents.'))
    .catch(err => winston.log.error('Error creating PouchDB design documents...', err));

  exports.destroy = pdb.destroy;
}

export default {
  data: {
    cpu: [
      {value: {
        avg: '',
        max: '',
        min: ''
      }
    }, {
      value: ''
    }, {
      value: {
        avgload: '',
        cpus: [
          {
            load: '',
            load_irq: '',
            load_nice: '',
            load_system: '',
            load_user: ''
          }
        ]
      }
    }],
    processes: [],
    memory: [],
    temperature: [],
    fan: [],
    battery: [],
    disk: [],
    diskfs: [],
    network: [],
    netConnections: []
  },
  info: {
    cpu: {},
    graphics: {
      controllers: [],
      displays: []
    },
    interfaces: [{}, {}],
    hardware: {},
    osInfo: {},
    time: {},
    users: [{}]
  },
  settings: {
    logLevel: '',
    port: '',
    modules: {
      system: {status: ''},
      cpu: {status: '', interval: ''},
      processes: {status: '', interval: ''},
      memory: {status: '', interval: ''},
      temperature: {status: '', interval: ''},
      fan: {status: '', interval: ''},
      battery: {status: '', interval: ''},
      disk: {status: '', interval: ''},
      diskfs: {status: '', interval: ''},
      network: {status: '', interval: '', iface: '', ping: ''},
      netConnections: {status: '', interval: ''}
    },
    db: {
      rethinkdb: {status: '', host: '', port: '', authKey: '', dbname: ''},
      postgres: {status: '', host: '', port: '', user: '', pass: '', dbname: ''},
      pouchdb: {status: ''},
      couchdb: {status: '', host: '', port: '', dbname: '', ssl: ''}
    }
  },
  logs: [],
  ajaxCallsInProgress: 0
};

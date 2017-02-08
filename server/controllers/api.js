const app = require('../index'),
      getSystem = require('../endpoints/getSystem'),
      getCpu = require('../endpoints/getCpu'),
      getMemory = require('../endpoints/getMemory'),
      getTemperature = require('../endpoints/getTemperature'),
      getDisk = require('../endpoints/getDisk'),
      getNetwork = require('../endpoints/getNetwork'),
      deletePouchDb = require('../endpoints/deletePouchDb'),
      settings = require('../services/settings'),
      getLogs = require('../endpoints/getLogs');

      // getSettings = require('../endpoints/getSettings'),
      // putSettings = require('../endpoints/getSettings'),

app.get('/api/system/info', getSystem.getSystemInfo);

app.get('/api/battery/data/:time', getSystem.getBatteryData);

app.get('/api/cpu/data/:time', getCpu.getCpuData);
app.get('/api/process/data/:time', getCpu.getProcesses);

app.get('/api/processes/:process', getCpu.getProcessLoad);
app.get('/api/services/:service', getCpu.getServices);


app.get('/api/memory/data/:time', getMemory.getMemoryData);

app.get('/api/temperature/data/:time', getTemperature.getTemperatureData);
app.get('/api/fan/data/:time', getTemperature.getFanData);

app.get('/api/disk/data/:time', getDisk.getDiskData);
app.get('/api/diskfs/data/:time', getDisk.getDiskfsData);

app.get('/api/network/data/:time', getNetwork.getNetworkData);
app.get('/api/netConnections/data/:time', getNetwork.getNetConnections);

app.get('/api/ip', getNetwork.getPublicIp);
app.get('/api/checkurl/:url', getNetwork.getCheckUrl);

app.get('/api/settings', settings.getSettings);
app.put('/api/settings', settings.putSettings);

app.get('/api/logs', getLogs.getLogs);

app.delete('/api/db/pouchdb', deletePouchDb.destroyPouchDb);

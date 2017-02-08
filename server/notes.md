


```javascript
const lovefield = require('./db/lovefield');
const rethinkdb = require('./db/rethinkdb');

let connections = [];
const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
  socket.once('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log(`disconnected: %s sockets remaining`);
  });

  socket.emit('data:battery', {
    data: {name: 'battery', value: 9}
  });


  connections.push(socket);
  console.log(`Connected: %s sockets connected`, connections.length);
});
```

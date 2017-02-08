// const r = require('rethinkdb'),
//       settings = require('../services/settings'),
//       app = require('../index'),
//       settings = app.locals.settings.config,
//
// if (settings.db.rethinkdb.status) {
//   rdbConfig = {
//       rethinkdb: {
//           host: "localhost",
//           port: 28015,
//           authKey: "",
//           db: "sysdata"
//       },
//       express: {
//           port: 3000
//       }
//   }
//
//   app.use(createConnection);
//
//   app.use(closeConnection);
//
//
//   function get(req, res, next) {
//       r.table('sysinput').orderBy({index: "createdAt"}).run(req._rdbConn).then(function(cursor) {
//           return cursor.toArray();
//       }).then(function(result) {
//           res.send(JSON.stringify(result));
//       }).error(handleError(res))
//       .finally(next);
//   }
//
//   function create(req, res, next) {
//       var todo = req.body;
//       todo.createdAt = r.now(); // Set the field `createdAt` to the current time
//       r.table('sysinput').insert(todo, {returnChanges: true}).run(req._rdbConn).then(function(result) {
//           if (result.inserted !== 1) {
//               handleError(res, next)(new Error("Document was not inserted."));
//           }
//           else {
//               res.send(JSON.stringify(result.changes[0].new_val));
//           }
//       }).error(handleError(res))
//       .finally(next);
//   }
//
//   function handleError(res) {
//       return function(error) {
//           res.send(500, {error: error.message});
//       }
//   }
//
//   function createConnection(req, res, next) {
//       r.connect(rdbConfig.rethinkdb).then(function(conn) {
//           req._rdbConn = conn;
//           next();
//       }).error(handleError(res));
//   }
//
//   function closeConnection(req, res, next) {
//       req._rdbConn.close();
//   }
//
//   r.connect(rdbConfig.rethinkdb, function(err, conn) {
//       if (err) {
//           console.log("Could not open a connection to initialize the database");
//           console.log(err.message);
//           process.exit(1);
//       }
//
//       r.table('sysinput').indexWait('createdAt').run(conn).then(function(err, result) {
//           console.log("Table and index are available, starting express...");
//           startExpress();
//       }).error(function(err) {
//           // The database/table/index was not available, create them
//           r.dbCreate(rdbConfig.rethinkdb.db).run(conn).finally(function() {
//               return r.tableCreate('sysinput').run(conn)
//           }).finally(function() {
//               r.table('sysinput').indexCreate('createdAt').run(conn);
//           }).finally(function(result) {
//               r.table('sysinput').indexWait('createdAt').run(conn)
//           }).then(function(result) {
//               console.log("Table and index are available, starting express...");
//               startExpress();
//               conn.close();
//           }).error(function(err) {
//               if (err) {
//                   console.log("Could not wait for the completion of the index `sysinput`");
//                   console.log(err);
//                   process.exit(1);
//               }
//               console.log("Table and index are available, starting express...");
//               startExpress();
//               conn.close();
//           });
//       });
//   });
//
//   function startExpress() {
//     let port = 3000;
//     http.createServer(app).listen(port, () => {
//       winston.log.info('Starting node server on', port);
//     });
//   }
// }

// const lf = require('lovefield'),
//       settings = require('./settings'),
//       winston = require('./winston');
//
// console.log('what');
// if (settings.config.saveData) {
//   console.log('building database');
//   let sysdata,
//       sysinput;
//
//   let schemaBuilder = lf.schema.create('sysdata', 1);
//   schemaBuilder.createTable('sysinput').
//     addColumn('id', lf.Type.INTEGER).
//     addColumn('time', lf.Type.DATE_TIME).
//     addColumn('name', lf.Type.STRING).
//     addColumn('value', lf.Type.OBJECT).
//     addPrimaryKey(['id'], true).
//     addIndex('idxTime', ['time'], false, lf.Order.DESC);
//
//   let connectOptions = {storeType: lf.schema.DataStoreType.INDEXED_DB};
//   schemaBuilder.connect(connectOptions).then((db) => {
//     sysdata = db;
//     sysinput = db.getSchema().table('sysinput');
//     let row = sysinput.createRow({
//       'id': 0,
//       'time': new Date(),
//       'name': 'test name',
//       'value': {testKey: 'test object value'}
//     });
//     return db.insert().into(sysinput).values([row]).exec();
//   }).then(() => {
//     return sysdata.select().from(sysinput).where(sysinput.done.eq(false)).exec();
//   }).then(results => {
//     results.forEach(function(row) {
//       console.log(row['value'], 'before', row['time']);
//     });
//   });
// } else {
//   console.log('persist only in memory');
// }

'use strict';

const fs = require('fs');
const parse = require('.');

let category_dir = '../match20170913';

let tables = fs.readdirSync(category_dir);

tables.map((table) => {
  fs.createReadStream(category_dir + '/' + table)
  .pipe(parse((meta) => {
    //console.log('meta for '+ table, meta);
    let cols_sql = meta.columns.map(meta => `${meta.name} ${meta.type}`).join(', ')
    let sql = `CREATE TABLE ${table} (${cols_sql});`
    console.log(sql);
  }));
})


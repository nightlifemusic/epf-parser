'use strict';

const fs = require('fs');
const parse = require('.');

//let category_dir = '../match20170913';
let category_dir = 'test/data';

let tables = fs.readdirSync(category_dir);

tables.map((table) => {
  fs.createReadStream(category_dir + '/' + table)
  .pipe(parse((meta, rows) => {
    //console.log('meta for '+ table, meta);
    let cols_sql = meta.columns.map(meta => `${meta.name}`).join(', ')
    let sql = `INSERT INTO ${table} (${cols_sql}) VALUES ();`
    
    rows.on('data', r => {
        console.log('row', r);
    })

  }));
})

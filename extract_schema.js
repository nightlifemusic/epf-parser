'use strict';

const fs = require('fs');
const parse = require('.');

let category_dir = '../itunes/match20170913';

let tables = fs.readdirSync(category_dir);

let create_sql = [];
let alter_sql = [];

tables.map((table) => {
  fs.createReadStream(category_dir + '/' + table)
  .pipe(parse((meta) => {
    console.log('meta for '+ table, meta);
    let cols_sql = meta.columns.map(meta => `${meta.name} ${meta.type}`).join(', ')
    create_sql.push(`CREATE TABLE ${table} (${cols_sql});`)
    alter_sql.push(`ALTER TABLE ${table} ADD PRIMARY KEY (${meta.primaryKey.join(', ')});`)
    
  })).on('finish', (err, res) => {console.log(create_sql.join('\n')); console.log(alter_sql.join('\n'))});
})

console.log("create sql ", create_sql)
console.log("alter sql ", alter_sql)


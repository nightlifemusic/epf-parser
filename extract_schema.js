'use strict';

const fs = require('fs');
const parse = require('.');

let category_dir = '../match20170913';

let tables = fs.readdirSync(category_dir);

tables.map((table) => {
  fs.createReadStream(category_dir + '/' + table)
  .pipe(parse((meta) => {
    console.log('meta for '+ table, meta);

  }));
})


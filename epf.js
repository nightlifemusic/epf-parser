'use strict';

const binarySplit = require('binary-split');
const bufferSplit = require('buffer-split');
const multipipe = require('multipipe');
const bytes = require('bytes');
const Writable = require('stream').Writable;
const PassThrough = require('stream').PassThrough;

const pound = '#'.charCodeAt(0);
const dbTypes = Buffer('dbTypes');
const primaryKey = Buffer('primaryKey');
const rowDelim = Buffer('\x01');

// class WriteHeader extends Writable {
//     write(line, encoding, cb) {
//         console.log(line.toString());
//         if(line[0] != '#'.charCodeAt(0))
//             this.end();
//         cb();
//     }
// }

class Epf {
    constructor(log) {
        this.log = log
    }

    metaStream() {
        return multipipe( // TODO : find why piping from binarySplit into the writeable without using multipipe doesn't work
            binarySplit('\x02\n', { // read a line at a time. 
                maxLength: bytes('1mb')
            }), new Writable({
                write: (line, encoding, cb) => {
                    console.log(line.toString());
                    cb();
                }
            })
        )

        //return stream;
        // binarySplit('\x02\n', { // read a line at a time. 
        //     maxLength: bytes('1mb')
        // }).pipe(

        // )


    }
}

module.exports = Epf;
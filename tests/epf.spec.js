'use strict'
const chai = require('chai');
const assert = require("assert");
const expect = chai.expect;
const Epf = require('../epf.js');
const fs = require('fs');

describe('epf', () => {
    describe('ingest', () => {
        let epf;

        before(function (done) {
            epf = new Epf();
            done();
        })

        it('should get schema from metadata', function (done) {
            this.timeout(60000)
            
            fs.createReadStream('./data/artist_match')
            .pipe(epf.metaStream())
            .on('finish', () => {
                done();
            })
        })
    })
})



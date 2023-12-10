'use strict';

const assert = require('assert')

// load dependencies 
const gpxCalcLineReferences = require('./gpxCalcLineReferences')
const fs = require('fs')

describe('gpsCalcLineReferences', () => {

  test('wkt linestring', () => {
    const wkt = fs.readFileSync('./test_data/linestring.wkt.txt', 'utf8');
    const expectedReferencedWkt = fs.readFileSync('./test_data/linestring.referenced.wkt.txt', 'utf8');
    const referencedWkt = gpxCalcLineReferences(wkt);
    assert.equal(referencedWkt, expectedReferencedWkt);
  });

});
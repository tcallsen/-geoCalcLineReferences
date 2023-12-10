# Elevation Gain in GPX files 
Calculates the distance traveled (linear reference) along a LINESTRING Z or MULTILINESTRING Z geometry, supplied in WKT format. Returns a WKT geometry with the M dimension populated.

The final result is in the same units as the original source data.. likely meters if sourced from Strava.

## Installing with NPM

```
npm i --save geo-calc-line-references
```

## Example
```

// load dependencies 
const fs = require('fs')
const gpxCalcLineReferences = require('./gpxCalcLineReferences.js')

// open sample file and load WKT
const sampleWKT = fs.readFileSync('./sample_data/Sample_Stintson_Beach.wkt', 'utf8')

// calculate linear references and save into WKT with 4th "M" dimension
const referencedWKT = gpxCalcLineReferences( sampleWKT )

console.log(referencedWKT)
```

## Dev/Test

```
nvm use
npm install
npm test
```

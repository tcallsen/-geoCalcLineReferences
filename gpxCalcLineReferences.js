'use strict';

const { wktToGeoJSON, geojsonToWKT } = require("@terraformer/wkt")
const turf = require('@turf/turf')

/**
 * Returns WKT of linestring with linear references added as the 4th ("M") Dimension. 
 *  
 *  For more information on the WKT coordinate dimensions, see the Geometric Objects section here:
 *    https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry
 * 
 * @param {string} LINESTRING Z or MULTILINESTRING Z, in WKT format
 * @return {string} LINESTRING ZM or MULTILINESTRING ZM, in WKT format
 *
 */
module.exports = function(inputWKT) {

  // iterate over linestrings in feature - either single for LINESTRING, or multiple
  //  for MULTILINESTRING
  const featureGeoJson = wktToGeoJSON(inputWKT);
  const featureLineStrings = (featureGeoJson.type.toLowerCase() === 'multilinestring') ? featureGeoJson.coordinates : [ featureGeoJson.coordinates ];
  const referencedLineStrings = [];
  featureLineStrings.forEach( lineStringCoords => {

    // load into turf linestring obj
    const linestring = turf.lineString(lineStringCoords)

    // add linear referencing - 4th "M" dimension
    let previousLength = 0 // track previous length
    let previousCoord = null
    linestring.geometry.coordinates.forEach( (currentCoord, index) => {
      
      const currentLength = 0

      // if first point set length to 0, otherwise append length to end of point array
      if (index===0) {
        currentCoord.push(0)
      } else {
        const distance = turf.distance(previousCoord, currentCoord, {units: 'miles'})
        currentCoord.push(previousCoord[3] + distance)
      }

      previousLength = currentLength
      previousCoord = currentCoord

    });

    referencedLineStrings.push(linestring);
  });

  // output back to WKT (including 4th dimension)
  let outputWKT;
  if (referencedLineStrings.length === 1) {
    // LINESTRING ZM
    outputWKT = geojsonToWKT(referencedLineStrings[0].geometry);
  } else {
    // MULTILINESTRING ZM
    const lineStringGeometryArray = referencedLineStrings.map( referencedLineString => referencedLineString.geometry.coordinates);
    const multiLineString = turf.multiLineString(lineStringGeometryArray);
    outputWKT = geojsonToWKT(multiLineString.geometry);
  }

  return outputWKT;

}

//const NodeGeocoder = require('node-geocoder');
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_GEOCODE_API_KEY,
  Promise: Promise
});
require('dotenv').config();


const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_GEOCODE_API_KEY,
  formatter: null
};

//const geocoder = NodeGeocoder(options);

var adresses = []

global.addressDB = new Map()


const geocodeGoogle = async (id, streetName, streetNumber, neighborhood, zipCode, city, region, bound) => {

  try {
    //id for unique record
    if (!global.addressDB.has(id)) {




      let response = null


      // Geocode an address.
      response = await googleGeocode(id, streetName,streetNumber+ ', '+city, neighborhood, zipCode, city, region, bound, 1)


      if (response.googleStatus == "ZERO_RESULTS") {
        response = await googleGeocode(id, streetName,streetNumber+', '+city +', '+region, '', '', '', '', bound, 2)
      }

      if (response.googleStatus == "ZERO_RESULTS") {
        response = await googleGeocode(id, '', '', '', zipCode, city, region, bound, 3)
      }

      if (response.googleStatus == "ZERO_RESULTS") {
        response = await googleGeocode(id, city, '', '', '', '', region, bound, 4)
      }

      if (response.googleStatus == "OK") {
        global.addressDB.set(id, response)
      }
      return response;
    }
    else {
      console.log('chached')
      return global.addressDB.get(id)

    }
  }
  catch (ee) {
    return null;
  }
}


const googleGeocode = async (id, streetName, streetNumber, neighborhood, zipCode, city, region, bound, cycle) => {

  if (!streetName) {
    streetName = '';

  }

  if (!streetNumber) {
    streetNumber = '';

  }
  if (!neighborhood) {
    neighborhood = '';

  }
  if (!zipCode) {
    neighborhood = '';

  }
  if (!city) {
    city = '';

  }
  if (!region) {
    region = '';

  }

  let nonStdAddress = streetName + ' ' + streetNumber;

  let response = []




  let googleAddress = ''
  let precision = ''
  let googleResponse = ''
  let googleType = ''
  let swBound = ''
  let inputAddress = nonStdAddress + ' zipCode:' + zipCode + ' region:' + region + ' neighborhood:' + neighborhood + ' city:' + city



  return await googleMapsClient.geocode({
    address: nonStdAddress,
    //bounds: { south: bound.south, west: bound.west, north: bound.north, east: bound.east },
    components: { postal_code: zipCode, country: "BR", administrative_area_level_1: region, administrative_area_level_2: city, neighborhood: neighborhood }
  })
    .asPromise()
    .then((res) => {

      googleResponse = res.json.status

      if (googleResponse == "OK") {

        precision = 'L5'

        googleAddress = res.json.results[0].formatted_address;
        swBound = 'OOB'
        let break_ = false;
        for (var i = 0; i < res.json.results[0].address_components.length; i++) {

          if (break_)
            break
          if (res.json.results[0].address_components[i].types.length > 0) {
            for (var j = 0; j < res.json.results[0].address_components[i].types.length; j++) {
              if (res.json.results[0].address_components[i].types[j] == 'street_number') {
                precision = 'L1'
                break_ = true
                break;
              }
              if (res.json.results[0].address_components[i].types[j] == 'route') {
                precision = 'L2'
                break_ = true
                break;
              }
              if (res.json.results[0].address_components[i].types[j] == 'postal_code') {
                precision = 'L3'
                break_ = true
                break;
              }
              if (res.json.results[0].address_components[i].types[j] == 'locality') {
                precision = 'L4'

              }
            }


          }

        }

        var lat = res.json.results[0].geometry.location.lat
        var lng = res.json.results[0].geometry.location.lng
        if ((lat <= bound.north) && (lat >= bound.south) && (lng <= bound.east) && (lng >= bound.west)) {
          swBound = 'IOB';
        }
        let googleType = ''
        if (res.json.results[0].types.length > 0)
          googleType = res.json.results[0].types[0]
        response = { "googleAddress": googleAddress, "googleStatus": googleResponse, "precision": precision, "bound": swBound, "latitude": lat, "longitude": lng, "googleType": googleType, "inputAddress": inputAddress.replace(/,/g, '.'), "cycle": cycle }
        console.log('id', id, ' types', res.json.results[0].types)


      }
      else {
        swBound = 'NAN'
        response = { "googleAddress": googleAddress, "googleStatus": googleResponse, "precision": precision, "bound": swBound, "latitude": "NA", "longitude": "NA", "googleType": "NA", "inputAddress": inputAddress.replace(/,/g, '.'), "cycle": cycle }

      }
      return response

    })
    .catch((err) => {
      return { "googleAddress": googleAddress, "googleStatus": googleResponse, "precision": precision, "bound": swBound, "latitude": "NA", "longitude": "NA", "googleType": "EXCEPTION", "inputAddress": inputAddress.replace(/,/g, '.'), "cycle": cycle }
    });


}

module.exports = { geocodeGoogle }


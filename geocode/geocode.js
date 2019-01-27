const request = require('request')
// Dark Sky API
// https://api.darksky.net/forecast/42f9aa1dd3350e2849358dae89196789/37.8267,-122.4233
//Google and Map Quest GeoCode API 
//  url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAU1hPuvcI5zESI1u8NMo5MPPzm8AJghSg&address=154%2094%20alwarpet%20chennai',
//  url: 'http://www.mapquestapi.com/geocoding/v1/address?key=AlYsC3rvvFXmFPE6sLIo7zeACkwyFAEb&location=154%2094%20alwarpet%20street%20chennai.', 
//  url: 'http://www.mapquestapi.com/geocoding/v1/reverse?key=KEY&location=30.333472,-81.470448'
var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURI(address)
    var options = {
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=AlYsC3rvvFXmFPE6sLIo7zeACkwyFAEb&location=${encodedAddress}`,
        json: true
    }

    request(options, (error, response, body) => {
        // console.log(JSON.stringify(body,undefined,2))
        if (error)
            return callback('Unable to connect GeoCode API. ' + error)
        //return console.log('Unable to connect GeoCode API. ' + error)
        callback(undefined, {
            address: body.results[0].providedLocation.location,
            latitude: body.results[0].locations[0].latLng.lat,
            longitude: body.results[0].locations[0].latLng.lng
        })
        /*console.log(`Address: ${body.results[0].providedLocation.location}`)
          console.log(`Latitude and Longitude: ${body.results[0].locations[0].latLng.lat} ${body.results[0].locations[0].latLng.lng}`)
         */  //console.log(body)
    })
}
//module.exports = { geocodeAddress }
module.exports.geocodeAddress = geocodeAddress;
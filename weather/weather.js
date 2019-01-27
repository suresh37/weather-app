const request = require('request')
// Dark Sky API
// https://api.darksky.net/forecast/42f9aa1dd3350e2849358dae89196789/37.8267,-122.4233
//Google and Map Quest GeoCode API 
//  url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAU1hPuvcI5zESI1u8NMo5MPPzm8AJghSg&address=154%2094%20alwarpet%20chennai',
//  url: 'http://www.mapquestapi.com/geocoding/v1/address?key=AlYsC3rvvFXmFPE6sLIo7zeACkwyFAEb&location=154%2094%20alwarpet%20street%20chennai.', 
//  url: 'http://www.mapquestapi.com/geocoding/v1/reverse?key=KEY&location=30.333472,-81.470448'
var getWeather = (latitude, longitude, callback) => {
    var options = {
        url: `https://api.darksky.net/forecast/42f9aa1dd3350e2849358dae89196789/${latitude},${longitude}`,
      // url : 'https://api.darksky.net/forecast/42f9aa1dd3350e2849358dae89196789/13.04653,80.25369',
       json: true
    }

    request(options, (error, response, body) => {
        // console.log(JSON.stringify(body,undefined,2))
        if (error)
            return callback('Unable to connect DarkSky Weather API. ' + error)
        if (response.statusCode == 400) {
            return callback('Unable to fetch Weather API. ' + error)

        }
        callback(undefined,{
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature,
            //current: body.currently
        })
       
    })
}
//module.exports = { geocodeAddress }
module.exports.getWeather = getWeather;
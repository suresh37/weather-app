const request = require('request')
const axios = require('axios')
const yargs = require('yargs')
var geocode = require('./geocode/geocode')
var weather = require('./weather/weather')
var argv = yargs
      /* .options({
            address: {
                  describe: 'provide the address',
                  demand: true,
                  alias: 'a',
                  string: true
            }
      })
      .help()
      .alias('help', 'h') */
      .argv
var address = argv.address
if(address === undefined)
{
      address = 'Alwarpet,Chennai'
}
var encodedAddress = encodeURI(address)
var geocodeUrl
      = `http://www.mapquestapi.com/geocoding/v1/address?key=AlYsC3rvvFXmFPE6sLIo7zeACkwyFAEb&location=${encodedAddress}`
var weatherUrl;
axios.get(geocodeUrl
)
      .then((response) => {
            return {
                  latitude: response.data.results[0].locations[0].latLng.lat,
                  address: response.data.results[0].providedLocation.location,
                  longitude: response.data.results[0].locations[0].latLng.lng
            }
      })
      .then((results) => {
            console.log(`Address: ${results.address}`)
            console.log(`Latitude and Longitude: ${results.latitude} ${results.longitude}`)
            return {
                  latitude: results.latitude,
                  longitude: results.longitude
            }
      })
      .then((coordinates) => {
            var latitude = coordinates.latitude;
            var longitude = coordinates.longitude;
            weatherUrl = `https://api.darksky.net/forecast/42f9aa1dd3350e2849358dae89196789/${latitude},${longitude}`
            return axios.get(weatherUrl)
      })
      .then((response) => {
            return {
                  temperature: response.data.currently.temperature,
                  apparentTemperature: response.data.currently.apparentTemperature,
                  //current: body.currently
            }
      })
      .then((results) => {
            console.log(`It's currently ${results.temperature}. It feels like ${results.apparentTemperature}.`)

      })
      .catch((e) => {
            if (e.code === 'ENOTFOUND') {
                  console.log('Unable to  connect to API services.')
            }
            else {
                  console.log(e.message)
            }
      })


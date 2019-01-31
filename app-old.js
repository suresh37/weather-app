const request = require('request')
const yargs = require('yargs')
var geocode = require('./geocode/geocode')
var weather = require('./weather/weather')
var argv = yargs
      .options({
            address: {
                  describe: 'provide the address',
                  demand: true,
                  alias: 'a',
                  string: true
            }
      })
      .help()
      .alias('help', 'h')
      .argv

var address = argv.address
var resultObj;
geocode.geocodeAddress(address, (errorMessage, results) => {
      if (errorMessage) {
            return console.log(errorMessage)
      }
      //console.log(JSON.stringify(results,undefined,2))
      console.log(`Address: ${results.address}`)
      console.log(`Latitude and Longitude: ${results.latitude} ${results.longitude}`)

      weather.getWeather(results.latitude, results.longitude,
            (errorMessage, results) => {
                  if (errorMessage)
                        return console.log(errMessage)
                 //console.log(JSON.stringify(results,undefined,2))
                  console.log(`It's currently ${results.temperature}. It feels like ${results.apparentTemperature}.`)
            })
})



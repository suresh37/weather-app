var request = require('request')

var geocodeAddress = (address) => {

    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURI(address)
        var options = {
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=AlYsC3rvvFXmFPE6sLIo7zeACkwyFAEb&location=${encodedAddress}`,
            json: true
        }
        request(options, (err, response, body) => {
            if (err)
                reject('Error connecting to Server')
            resolve( {
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            })
        })
    })
}
geocodeAddress('Alwarpet,Chennai')
        .then((location) => { console.log(JSON.stringify(location, undefined, 2)) })
        .catch((err) => { console.log(err) })
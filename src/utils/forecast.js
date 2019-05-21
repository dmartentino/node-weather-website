const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1dbc0fb1adb887795305eeef8eb933cf/'+ latitude + ',' + longitude + '?units=si'

    request({url, json: true},(error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Could not find address. Try another search!', undefined)
        } else {
            callback(undefined,body.daily.data[0].summary +' It is currently ' + body.currently.temperature + ' degrees Celsius out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}


module.exports = forecast
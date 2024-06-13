var path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
app.use(express.static('dist'))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())
const { parseWeatherInfo } = require('./weather.js')
const request = require('request')

let infoToSend = {
    name: '', 
    country: '', 
    distance: '', 
    temperature: '',
    windspeed: '',
    precipitation: '',
    snow: '',
    url: ''
}

app.post('', function (req, res) {
    const latitude = req.body.latitude
    const longitude = req.body.longitude

    //full requests for Geonames and Weatherbit API
    const urlGeoNames = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=${process.env.GEONAMES_USERNAME}`
    const urlWeather = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_API_KEY}`

    // getting info from Geonames, Weatherbit, and Pixabay, and
    // sending in to client
    const data = fetch(urlGeoNames)
        .then(function (data) { return data.json() })
        .then(function (info) { parseGeonamesInfo(info) })

        .then(function () {
            
            // if info from Geonames is okay, then proceeding
            if (infoToSend.name != undefined) {
                infoToSend.status = 'okay'

                // gettting info mrom Weatherbit and photo from Pixabay
                // and sending it to client
                const data = fetch(urlWeather)
                    .then(function (data) { return data.json() })
                    .then(function (info) { parseWeatherInfo(info, infoToSend) })

                    .then(function () {
                        // full request for Pixabay API based on the nearest
                        // populated place obtained from Geonames
                        const urlPixabay = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${infoToSend.country}+nature&image_type=photo&pretty=true`
                        return fetch(urlPixabay)
                    })
                    .then(function (data) { return data.json() })
                    .then(function(info) { 
                        parsePixabayInfo(info)
                        res.send(infoToSend)
                    })
            } else throw Error('place not listed')
        })
        .catch(function () {
            infoToSend.status = 'error'
            res.send(infoToSend)
        })
})

const parseGeonamesInfo = function(info) {
    if (info.geonames == undefined) throw ''
    else if (info.geonames[0] == undefined) throw ''
    else {
        infoToSend.name = info.geonames[0].name,
        infoToSend.country = info.geonames[0].countryName,
        infoToSend.distance = info.geonames[0].distance
    }
}

function parsePixabayInfo(info) {
    if (info.hits[0].largeImageURL == undefined) throw ''
    else infoToSend.url = info.hits[0].largeImageURL
}

exports.parseGeonamesInfo = parseGeonamesInfo
exports.infoToSend = infoToSend 
exports.app = app

const PLACE_NOT_FOUND = 0
const COORDINATES_OUT_OR_RANGE = 1
const EMPTY = 2
const NEGATIVE_TIME = 3
const INVALID_DATE = 4

const getPlace = async function (coordinates) {
    const res = await fetch("http://localhost:8081", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coordinates)
    })
    return res
}

function listener(event) {
    const coordinates = {
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value
    }
    const startDate = new Date()
    const theDate = document.getElementById('date').value
    const year = theDate.substring(0, 4)
    const month = parseInt(theDate.substring(5, 7)) - 1
    const day = theDate.substring(8, 10)
    const endDate = new Date(year, month, day)
    const numberOfDays = Math.ceil((endDate - startDate) / 1000 / 60 / 60 / 24)
    if (coordinates.latitude == '' || coordinates.longitude == '') {
        writeErrorMessage(EMPTY)
    } else if (coordinates.latitude < -90 || coordinates.latitude > 90 || coordinates.longitude < -180 || coordinates.longitude > 180) {
        writeErrorMessage(COORDINATES_OUT_OR_RANGE)
    } else if (numberOfDays < 0) {
        writeErrorMessage(NEGATIVE_TIME)
    } else if (endDate == 'Invalid Date') {
        writeErrorMessage(INVALID_DATE)
    } else 
        {
        getPlace(coordinates)
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                if (data.status == 'error') {
                    writeErrorMessage(PLACE_NOT_FOUND)
                } else {
                    // rendering info on the web page
                    document.getElementById('photo').style.cssText = 'display: block'
                    document.getElementById('photo').setAttribute('src', data.url)
                    document.getElementById('title-name').textContent = 'Nearest populated place:'
                    document.getElementById('name').textContent = data.name
                    document.getElementById('title-country').textContent = 'Country:'
                    document.getElementById('country').textContent = data.country
                    document.getElementById('title-distance').textContent = 'Distance from your point:'
                    document.getElementById('distance').textContent = `${Math.round(data.distance)} km`
                    document.getElementById('title-temperature').textContent = 'Temperarure:'
                    document.getElementById('temperature').textContent = `${Math.round(data.temperature)} C`
                    document.getElementById('title-wind').textContent = 'Wind speed:'
                    document.getElementById('wind').textContent = `${Math.round(data.windSpeed)} m/s`
                    document.getElementById('title-precipitation').textContent = 'Precipitation:'
                    document.getElementById('precipitation').textContent = `${Math.round(data.precipitation)} mm/hr`
                    document.getElementById('title-snow').textContent = 'Snow: '
                    document.getElementById('snow').textContent = `${Math.round(data.snow)} mm/hr`
                    document.getElementById('title-travel-duration').textContent = 'Travel duration: '
                    document.getElementById('travel-duration').textContent = `${Math.abs(numberOfDays)} days`
                }
            })
    }
}

function writeErrorMessage(error) {

    document.getElementById('title-name').textContent = writeErrorText(error)

    // clearing the page
    document.getElementById('photo').style.cssText = ('display: none')
    document.getElementById('name').textContent = ''
    document.getElementById('title-country').textContent = ''
    document.getElementById('country').textContent = ''
    document.getElementById('title-distance').textContent = ''
    document.getElementById('distance').textContent = ''
    document.getElementById('title-temperature').textContent = ''
    document.getElementById('temperature').textContent = ''
    document.getElementById('title-wind').textContent = ''
    document.getElementById('wind').textContent = ''
    document.getElementById('title-precipitation').textContent = ''
    document.getElementById('precipitation').textContent = ''
    document.getElementById('title-snow').textContent = ''
    document.getElementById('snow').textContent = ''
    document.getElementById('title-travel-duration').textContent = ''
    document.getElementById('travel-duration').textContent = ''
}

const writeErrorText = function (error) {
    if (error == PLACE_NOT_FOUND) {
        return ('Place not listed.  It is probably somewhere in the ocean.')
    } else if (error == COORDINATES_OUT_OR_RANGE) {
        return ('Coordinate(s) out of range')
    } else if (error == EMPTY) {
        return ('Please enter both latitude and longitude')
    } else if (error == INVALID_DATE) {
        return ('Invalid Date')
    } else {
        return ('Arrival date can\'t be in the past')
    }
}

exports.listener = listener
exports.writeErrorText = writeErrorText
exports.placeNotFound = PLACE_NOT_FOUND
exports.coordinatesOutOfRange = COORDINATES_OUT_OR_RANGE
exports.empty = EMPTY
exports.negativeTime = NEGATIVE_TIME
exports.invalidDate = INVALID_DATE

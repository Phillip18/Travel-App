const parseWeatherInfo = (info, infoToSend) => {
    if (info.data == undefined) { throw '' }
    else {
        infoToSend.temperature = info.data[0].temp
        infoToSend.windSpeed = info.data[0].wind_spd,
        infoToSend.precipitation = info.data[0].precip,
        infoToSend.snow = info.data[0].snow
    }
}

exports.parseWeatherInfo = parseWeatherInfo

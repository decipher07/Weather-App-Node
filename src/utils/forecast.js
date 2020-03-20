const request = require ('request')

const forecast = (latitude, longitude , callbacks) => {
    const url = 'https://api.darksky.net/forecast/8d7591339496a48a975f330fe36ed533/' + latitude + ',' + longitude
    request ( {url, json : true} , (error,{body}) => {
        if (error){
            callbacks ('Unable To Connect To Dark Sky', undefined);
            //console.log('Unable to Connect to DarkSky');
        } else if (body.error){
            callbacks ('Plz Try Another Search' , undefined);
        }
        else {
            const precipitionProb = body.currently.precipProbability ;
            const summary = body.daily.data[0].summary ;
            callbacks (undefined , summary + ' It is currently ' + body.currently.temperature + ' . There is a ' + precipitionProb + ' of Rain')
        }
    })
}

module.exports = forecast
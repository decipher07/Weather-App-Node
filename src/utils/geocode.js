const request = require('request')

const geocode = (address , callbacks) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiYWxwb25zYSIsImEiOiJjazdzMTJ4ZnUwYXp2M2VwZ2ZyZTF4am9zIn0.WGSzXr_TK3f3mViLT3om_g';
    request ( {url , json : true}, (error, {body}) => {
        if (error){
            callbacks ('Unable to connect to location services!', undefined)       
        } else if (body.features.length === 0) {
            callbacks('Unable to find location. Try another search', undefined)
        } else {
            callbacks (undefined , {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode
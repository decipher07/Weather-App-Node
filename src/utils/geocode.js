const request = require('request')

const geocode = (address , callbacks) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiYWxwb25zYSIsImEiOiJja3Q1djhtMmwwY2M0Mndxc3h0ZHh4aTVnIn0.OwtNehGkIMVcn1zNQy5cXg';
    request ( {url , json : true}, (error, {body}) => {
        //console.log(body);
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

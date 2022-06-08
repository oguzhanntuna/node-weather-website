const path = require('path');
const request = require('request');

require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

const forecast = (latitude, longitude, callback) => {
    const url = `${process.env.WEATHER_BASE_URL}?access_key=${process.env.WEATHER_API_KEY}&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current;
            
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} Degress out. It feels like ${feelslike} Degress out.`);
        }
    });
}

module.exports = forecast;
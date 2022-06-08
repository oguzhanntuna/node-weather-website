const path = require('path');
const request = require('request');

require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address)
    const url = `${process.env.GEOCODE_BASE_URL}?access_key=${process.env.GEOCODE_API_KEY}&query=${encodedAddress}&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { label, latitude, longitude } = body.data[0];
            const locationData = {
                location: label,
                latitude,
                longitude
            }

            callback(undefined, locationData);
        }
    })
}

module.exports = geocode;
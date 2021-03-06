const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Oguzhan Tuna'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Oguzhan Tuna'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Oguzhan Tuna',
        helpText: "This is a help message!"
    });
});

app.get('/weather', (req, res) => {
    const addressQuery = req.query.address;

    if (!addressQuery) {
        return res.send({
            error: "You must provide a address term!"
        });
    }

    geocode(addressQuery, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return  res.send({ error });
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: addressQuery
            })
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }

    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Oguzhan Tuna',
        errorMessage: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Oguzhan Tuna',
        errorMessage: 'Page not found!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
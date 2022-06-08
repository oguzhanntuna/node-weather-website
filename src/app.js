const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
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
        helpMessage: "This is a help message!"
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecase: 'It is so hot',
        location: 'Arizona'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
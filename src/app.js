const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;


//console.log(__dirname); 
//It will tell the path in which wrking file resides

const app = express();
//Here we are creating routes. So that all pages like http://test.com ,http://test.com/about, http://test.com/pricing run on the same web server 


//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
//To get path of public folder so that we can use the html file sitting inside that folder
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs'); //To set up handel bars so that we can work with dynamic templates
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//console.log("Hello");
//Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //Way to customize the server

/*
JUST  for reference purpose
app.get('', (req, res) => {
    //req->request
    //res->response
    res.send('<h1>Hello Server</h1');
    //The message passed in res.send will be displayed in the browser
});
*/
app.get('/help', (req, res) => {
    //req->request
    //res->response
    res.render('help', {
        email: 'mickeyMouse9@disneyland.co.us',
        title: 'Help',
        name: 'DJ',
        helpText: 'We are 24*7 ready to help you'
    });
});

app.get('/about', (req, res) => {
    //req->request
    //res->response
    res.render('about', {
        title: 'About me',
        name: 'DJ'
    });
});


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'DJ'
    });
    //The message passed in res.send will be displayed in the browser
});


app.get('/weather', (req, res) => {

    /*If address is not provided*/

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error });
        }

        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });

});
app.get('/products', (req, res) => {
    //req->request
    //res->response
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

// This need to come at last after every other route is set up
app.get('/help/*', (req, res) => {
    //req->request
    //res->response
    res.render('404', {
        title: '404',
        name: 'DJ',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    //req->request
    //res->response
    res.render('404', {
        title: '404',
        name: 'DJ',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
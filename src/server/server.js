// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

// Setup Server
const port = 3001;
const server = app.listen(port, listening);

function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

//GET Route that returns projectData
app.get('/all', getData)

app.get('/', function (req, res) {
    res.status(200).sendFile('dist/index.html')
})

function getData(req, res) {
    res.send(projectData);
    console.log('project data', projectData);
}

//POST Route to populate projectData
app.post('/add', addData);

function addData(req, res){
    projectData['lat'] = req.body.lat;
    projectData['long'] = req.body.long;
    projectData['country'] = req.body.country;
    projectData['temp'] = req.body.temp;
    projectData['weather'] = req.body.weather;
    res.send(projectData);
};

module.exports = app;
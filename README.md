# Travel App Capstone Project

## Overview
This project is a travel app that allows a user to enter a destination city and trip date, and either the current weather or forecast will be displayed, along with a picture of said destination. The project makes use of the geonames, weatherbit, and pixabay APIs to do so.

## Extended Option
The extended functionality I chose to build was: 
* Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
You can see this in the `getImage()` function, where a local city will pull up a picture of the country instead.

## Build Tools
* Webpack
* Express
* Node.js

## Getting Started
After cloning the repo, install all dependencies with `npm install`. The server runs on port 3001, here: `http://localhost:3001/`

## API Info
Replace the keys with your own with the GeoNames, WeatherBit, and Pixabay APIs. Sign up and get keys and replace the variables accordingly. 

## Start the project
Use `npm run build-prod` to build the Webpack app, and `npm start` to fire up the server, then visit the 3001 port to see the final web app.
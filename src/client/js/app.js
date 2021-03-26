import "regenerator-runtime/runtime";
/* Global Variables */
const geoURL = 'http://api.geonames.org/searchJSON?q=';
const username = 'sanjana319';

const bitKey = 'b050e73fa97c44cb8a297b5c08a37ac8';
const weatherBitFut = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const weatherBitCurr =  'http://api.weatherbit.io/v2.0/current?';

const pixabayKey = '20843265-77d792466a55998e7b54dafc0';
const pixabayURL = 'https://pixabay.com/api/?key=';

const myData = {}; //store all data

// Create a new date instance dynamically with JS
let currDate = new Date();
let nextWeek = new Date(new Date(currDate).setDate(new Date().getDate() + 7));  

const performAction = async(e) => {
    e.preventDefault();

    myData.city = document.getElementById('city').value;
    const travelDate = new Date(document.getElementById('date').value);

    const geo = await getLocation(myData.city);

    myData.lat = geo.lat;
    myData.lon = geo.lon;
    myData.country = geo.country;

    if(travelDate <= nextWeek) {
         const weather = await getWeather(myData.lat, myData.lon);
         myData.temp = weather.temp;
         myData.weather = weather.info;
    } else {
         const weather = await getForecast(myData.lat, myData.lon);
         myData.temp = weather.temp;
         myData.weather = weather.info;
    }
    myData.img = await getImage(myData.city, myData.country);
    console.log("img:", myData.img)

    postData('/add', {lat:  myData.lat, long:  myData.lon, country: myData.country, temp: myData.temp, weather: myData.weather})
    updateUI();

    console.log("finalized data (myData)", myData);
}

//function to get data from API
async function getLocation(city) {
    const url = `${geoURL}${city}&maxRows=10&username=${username}`;
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log("location data:", data);

        const location = {}; //return relevant data from api with this object

        location.lat = data.geonames[0].lat;
        location.lon = data.geonames[0].lng;
        location.country = data.geonames[0].countryName;

        return location;
    } catch(error) {
        console.log("error in location data:", error);
    }
}

//function to get forecast data
async function getForecast(lat, lon) {
    const url = `${weatherBitFut}&lat=${lat}&lon=${lon}&key=${bitKey}`;
    const res = await fetch(url)
    try {
        const data = await res.json();
        console.log("FORECAST data:", data);

        const weather = {};
        weather.temp = data.data[0].temp;
        weather.info = data.data[0].weather.description;

        return weather;
    } catch(error) {
        console.log("error in forecast data:", error);
    }
}

//function to get current weather
async function getWeather(lat, lon) {
    const url = `${weatherBitCurr}&lat=${lat}&lon=${lon}&key=${bitKey}`;
    const res = await fetch(url)
    try {
        const data = await res.json();
        console.log("WEATHER data:", data);

        const weather = {};
        weather.temp = data.data[0].temp;
        weather.info = data.data[0].weather.description;

        return weather;
    } catch(error) {
        console.log("error in weather data:", error);
    }
}

//function to get image of country desintation with pixabay API
async function getImage(city, country) {
    const urlCountry = `${pixabayURL}${pixabayKey}&q=${country}&imagetype=photo&pretty=true&category=places`;
    const urlCity = `${pixabayURL}${pixabayKey}&q=${city}&imagetype=photo&pretty=true&category=places`;

    try {
        let res = await fetch(urlCity);
        if(res.ok) {
            let data = await res.json();
            if(data.totalHits === 0) { //if there are no city pictures, get country pics
                res = await fetch(urlCountry);
                try {
                    data = await res.json();
                    return data.hits[0].webformatURL;
                } catch (error) {
                    console.log("error with country photo", error);
                }
            }
            return data.hits[0].webformatURL;
        }
    } catch(error) {
        console.log("error with getting city photo", error);
    }
}

//function to post data
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

//function to update UI
const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        console.log(allData);
        document.getElementById('latitude').innerHTML = allData.lat;
        document.getElementById('longitude').innerHTML = allData.long;
        document.getElementById('country').innerHTML = allData.country;
        document.getElementById('temperature').innerHTML = allData.temp;
        document.getElementById('weather').innerHTML = allData.weather;
    } catch(error) {
        console.log("error", error);
    }

    let myImg = document.getElementById('tripImg');
    myImg.setAttribute('src', myData.img);
}

var button = document.getElementById('generate');
if(button) {
    button.addEventListener('click', performAction);
} //use if statement for jest test

// document.getElementById('generate').addEventListener('click', performAction);

export { performAction }
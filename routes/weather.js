var express = require('express');
var router = express.Router();
var axios = require("axios").default;

require('dotenv').config()

var options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/find',
  params: {
    lon: '0',
    lat: '0',
  },
  headers: {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
  }
};

/* GET weather api. */ 
router.get('/', async  (req, res) => {  
  console.log("test", req.query)  
  options.params = req.query;
  axios.request(options).then(function (response) {
	  console.log("response", response.data.list)
    res
    .status(200)
    .json({ error: false, data: response.data });
  })
  .catch(function (error) {
	  console.error(error);
  });
    });   

module.exports = router;

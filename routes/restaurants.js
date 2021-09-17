const express = require('express');
const axios = require('axios')
const router = express.Router();

require('dotenv').config()

const options = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },
  headers: {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_RESTAURANTS_API_KEY,
  }
};

/* GET restaurants api. */ 
router.get('/', async  (req, res) => {    
  options.params = req.query;
  axios.request(options).then(function (response) {
    console.log("response", response)
    res
    .status(200)
    .json({ error: false, data: response.data });
  }).catch(function (error) {
    console.error(error);
  });
    });   

module.exports = router; 




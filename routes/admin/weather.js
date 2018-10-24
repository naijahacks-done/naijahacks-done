const express = require('express');
const router = express.Router();
const request= require('request');
const title = "Weather";
const url = "api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=66abc74e169851ed21456ad3311519aa"

//Get Weather route
router.get('/', (req, res) => {
    request(url, (err, res, body) => {
        res.render('weather', {
            title: title,
            body: JSON.parse(body)
        });
    });
});
"use strict";
const axios = require("axios")
const { token } = require('../config.json');
/*
const axios = require("axios");
const apikey = "4e61a8280130d2ba352d5eb9f9cc4bd6";

const getCurrentWeather = location => {
    return new Promise(async (resolve, reject) => {
        try {
            const weatherConditions = await axios.get("https://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        appid: apikey,
                        q: location,
                        units: "metric"
                    }
                });
            resolve(weatherConditions.data);
        }
        catch (error) {

            reject(error);
        }
    });
}

const getWeather = location => {
    return new Promise(async (resolve, reject) => {
        try {
            const weatherConditions = await axios.get("https://api.openweathermap.org/data/2.5/forecast",
                {
                    params: {
                        appid: apikey,
                        q: location,
                        units: "metric"
                    }
                });
            resolve(weatherConditions.data);
        }
        catch (error) {

            reject(error);
        }
    });
}

exports.getCurrentWeather = getCurrentWeather;
exports.getWeather = getWeather;
//module.exports = getCurrentWeather;
//module.exports = getWeather;
*/
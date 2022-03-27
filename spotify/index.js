"use strict";
const axios = require("axios").default
const qs = require('qs');
const { CLIENT_ID, CLIENT_SECRET } = require('../config.json');

const auth_token = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`, 'utf-8').toString('base64');

const getAuth = async () => {
    try {
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = qs.stringify({ 'grant_type': 'client_credentials' });

        const response = await axios.post(token_url, data, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return response.data.access_token;
        //console.log(response.data.access_token);   
    } catch (error) {
        console.log(error);
    }
}

module.exports.getArtist = async function getArtist(artist) {
    const access_token = await getAuth();
    const api_url = "https://api.spotify.com/v1/search"

    try {
        const response = await axios.get(api_url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params : {
                "q": artist,
                "type": "artist",
                "market": "FR"
            }
        });
        return response.data.artists.items[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports.getTrack = async function getTrack(track) {
    const access_token = await getAuth();
    const api_url = "https://api.spotify.com/v1/search"

    try {
        const response = await axios.get(api_url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params : {
                "q": track,
                "type": "track",
                "market": "FR"
            }
        });
        return response.data.tracks.items[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports.getArtistTopTracks = async function getArtistTopTracks(id) {
    const access_token = await getAuth();
    const api_url = `https://api.spotify.com/v1/artists/${id}/top-tracks`
    try {
        const response = await axios.get(api_url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params : {
                "market": "FR"
            }
        });
        return response.data.tracks;
    } catch (error) {
        console.log(error);
    }
}

module.exports.getGenres = async function getGenres() {
    const access_token = await getAuth();
    const api_url = "https://api.spotify.com/v1/recommendations/available-genre-seeds"
    try {
        const response = await axios.get(api_url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`
            }
        });
        return response.data.genres;
    } catch (error) {
        console.log(error);
    }
}

module.exports.getRecommendations = async function getRecommendations(artists, genres, tracks) {
    const access_token = await getAuth();
    const api_url = "https://api.spotify.com/v1/recommendations"
    try {
        const response = await axios.get(api_url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params : {
                "seed_artists" : artists.join(","),
                "seed_genres": genres.join(","),
                "seed_tracks": tracks.join(","),
                "market": "FR"
            }
        });
        return response.data.tracks;
    } catch (error) {
        console.log(error);
    }
}
/*
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
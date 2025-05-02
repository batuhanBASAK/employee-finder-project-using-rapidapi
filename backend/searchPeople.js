const axios = require('axios');
require('dotenv').config()


const API_KEY = process.env.RAPIDAPI_KEY

module.exports = {
    getResponse : (keywords, start) => axios.request({
        method: 'GET',
        url: 'https://linkedin-data-api.p.rapidapi.com/search-people',
        params: {
            keywords: keywords,
            start: start,
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com'
        }
    })
}
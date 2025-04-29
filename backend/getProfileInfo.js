const axios = require('axios');
require('dotenv').config()


const API_KEY = process.env.GET_PROFILE_INFO_API_KEY


module.exports = {
	getResponse : (username) => axios.request({
        method: 'GET',
        url: 'https://linkedin-data-api.p.rapidapi.com/',
        params: {
          username: username
        },
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com'
        }
      })
}
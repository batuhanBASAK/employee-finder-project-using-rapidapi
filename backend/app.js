const express = require('express')
const app = express()

require('dotenv').config()


const PORT = process.env.PORT


const profileInfoAPI = require('./profileInfo')

const getProfileInfo = async (username) => {
    try {
        const response = await profileInfoAPI.getResponse(username)
        return response.data;
    } catch (err) {
        console.error(`Failed to fetch profile for ${username}:`, err);
        throw err; 
    }
}

// Debugging profileInfoAPI
getProfileInfo('batuhan-basak')
  .then(profileData => {
    console.log(profileData);
  })
  .catch(err => {
    console.error('Error fetching profile info:', err);
  });



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

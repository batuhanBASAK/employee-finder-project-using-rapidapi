const express = require('express')
const app = express()

require('dotenv').config()


const PORT = process.env.PORT


const profileInfoAPI = require('./profileInfo')

const searchPeopleAPI = require('./searchPeople')


// returns the data of the user, linkedIn username has been given as parameter
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
// getProfileInfo('batuhan-basak')
//   .then(profileData => {
//     console.log(profileData);
//   })
//   .catch(err => {
//     console.error('Error fetching profile info:', err);
//   });


// keyword: job name
// start: page number
const getPeopleSearched = async (keywords, start) => {
    try {
        const response = await searchPeopleAPI.getResponse(keywords, start)
        return response.data;
    } catch (err) {
        console.error(`Failed during searching people`, err);
        throw err;
    }
}


// Debugging getPeopleSearched
getPeopleSearched('data science', 0)
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

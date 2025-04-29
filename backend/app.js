const express = require('express')
const app = express()

require('dotenv').config()


const PORT = process.env.PORT


const profileInfoAPI = require('./profileInfo')

const getProfileInfo = async (username) => {
    const response = await profileInfoAPI.getResponse(username)
    return response.data;
}

// Debugging profileInfoAPI
const profileData = getProfileInfo('batuhan-basak')
console.log('-------------------------------------------')
console.log(profileData)
console.log('-------------------------------------------')







app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

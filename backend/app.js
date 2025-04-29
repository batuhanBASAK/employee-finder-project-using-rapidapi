const express = require('express')
const app = express()

require('dotenv').config()


const PORT = process.env.PORT


const getProfileInfo = require('./getProfileInfo')

const asyncAPICall = async (username) => {
    const response = await getProfileInfo.getResponse(username)
    console.log(response.data)
}

asyncAPICall('batuhan-basak')

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

const express = require('express');
const app = express();

const profileInfoAPI = require('./profileInfo')
const searchPeopleAPI = require('./searchPeople')


require('dotenv').config()


const PORT = process.env.PORT


// Returns necessary profile information of the user, username has been given
const getPersonProfileInfo = async (username) => {
    try {
        const response = await profileInfoAPI.getResponse(username);
        const data = response.data;
        return {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            headline: data.headline,
            summary: data.summary,
            country: data.geo.country,
            city: data.geo.city,
            countryCode: data.geo.countryCode,
        };
    } catch (err) {
        console.error(`Failed to fetch profile for ${username}:`, err);
        return null;
    }
}


// Return data in object format that cantains list of people
// These people are search result of API call respect to the given keywords
const getSearchPeopleData = async (keywords) => {
    try {
        const response = await searchPeopleAPI.getResponse(keywords);
        return response.data.data;
    } catch (err) {
        console.error(`Failed during searching people`, err);
        return null;
    }
}


// Returns list of usernames' of people in given list
// this function helps ot extract usernames' from the output of function getSearchPeopleData
const extractPeoplesUsername = (data) => {
    const usernameList = [];

    if (data.items !== null) {

        data.items.forEach(person => {
            usernameList.push(person.username);
        })
    }
    return usernameList;
}


// searches people respect to the keywords and at the end
// return their necessary profile information in a list
const searchAndGetPeopleInfo = async (keywords) => {
    const data = await getSearchPeopleData(keywords);
    const usernameList = extractPeoplesUsername(data);

    peopleInfoList = [];
    for (const username of usernameList) {
        const person = await getPersonProfileInfo(username);
        peopleInfoList.push(person);
    }

    return peopleInfoList;
}




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

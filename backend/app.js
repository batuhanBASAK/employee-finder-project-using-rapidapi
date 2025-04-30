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


function extractPeopleInfo(jsonData) {
    if (!jsonData || !jsonData.data || !Array.isArray(jsonData.data.items)) {
        console.error("Invalid JSON structure");
        return [];
    }
  
    return jsonData.data.items.map(person => ({
        username: person.username,
        fullName: person.fullName,
        location: person.location
    }));
}


async function getAllPeopleSearched(keywords) {
    let start = 0;
    const peopleInList = [];

    while (true) {
        try {
            const response = await getPeopleSearched(keywords, start);
            
            // Check if items is null
            if (!response || !response.data || response.data.items === null) {
                break;
            }

            // Extract and append people info
            const extracted = extractPeopleInfo(response);
            peopleInList.push(...extracted);

            start++; // Move to the next page
        } catch (err) {
            console.error("Error fetching people at page", start, ":", err);
            break; // Exit on error
        }
    }

    return peopleInList;
}


async function printAllProfiles(keywords) {
    try {
        const peopleList = await getAllPeopleSearched(keywords);

        for (const person of peopleList) {
            if (!person.username) {
                console.warn("Missing username for person:", person);
                continue;
            }

            try {
                const profile = await getProfileInfo(person.username);
                console.log("Profile Info for", person.username, ":", profile);
            } catch (err) {
                console.error(`Could not fetch or print profile for ${person.username}`);
            }
        }
    } catch (err) {
        console.error("Failed to fetch or process people list:", err);
    }
}



// Example usage
printAllProfiles("data science");





// testing getAllPeopleSearched
// getAllPeopleSearched('data science')
//     .then(peopleInList => {
//         console.log("Total people fetched:", peopleInList.length);
//         console.log(peopleInList);
//     })
//     .catch(err => console.error("Failed to fetch all people:", err));




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

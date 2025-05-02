const profileInfoAPI = require('./profileInfo');
const searchPeopleAPI = require('./searchPeople');


// Internal utility functions
const getPersonProfileInfo = async (username) => {
  try {

    const profileresponse = await profileInfoAPI.getResponse(username);
    const data = profileresponse.data;

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
      profilePicture: data.profilePicture,
      educations: data.educations,
    };
  } catch (err) {
    if (err.response && err.response.status === 429) {
      console.error("Rate limit exceeded. Please wait and try again.");
    } else {
      console.error(`Failed to fetch profile for ${username}:`, err);
    }
    
    return null;
  }
};


const getSearchPeopleData = async (keywords) => {
  const usernameList = [];

  try {
    // Create an array of start values
    const startValues = [...Array(50).keys()];


    // Create all requests in parallel
    const requests = startValues.map((start) =>
      searchPeopleAPI.getResponse(keywords, start) // search for 50 pages
    );

    // Await all results safely
    const responses = await Promise.allSettled(requests);

    for (const result of responses) {
      if (result.status === "fulfilled") {
        const data = result.value.data;
        if (data && data.data && Array.isArray(data.data.items)) {
          for (const item of data.data.items) {
            if (!usernameList.includes(item.username)) {
              usernameList.push(item.username);
            }
          }
        }
      } else if (
        result.status === "rejected" &&
        result.reason?.response?.status === 429
      ) {
        console.warn("Rate limit hit on one request.");
      } else {
        console.warn("Error in one request:", result.reason);
      }
    }

    return usernameList;
  } catch (err) {
    console.error("Unexpected failure in getSearchPeopleData:", err);
    return [];
  }
};



const searchAndGetPeopleInfo = async (keywords) => {
  const usernameList = await getSearchPeopleData(keywords);

  const peopleInfoList = [];
  for (const username of usernameList) {
    const person = await getPersonProfileInfo(username);
    if (person) peopleInfoList.push(person);
  }

  return peopleInfoList;
};



module.exports = {
  searchAndGetPeopleInfo
};

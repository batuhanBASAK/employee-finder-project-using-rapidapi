const profileInfoAPI = require('./profileInfo');
const searchPeopleAPI = require('./searchPeople');
// const emailAPI = require('./getEmail');


// Internal utility functions
const getPersonProfileInfo = async (username) => {
  try {

    // const emailResponse = await emailAPI.getResponse(username);
    // const emailResposeData = emailResponse.data;

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
      // emails: emailResposeData.emails,
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
  try {
    const response = await searchPeopleAPI.getResponse(keywords);
    return response.data.data;
  } catch (err) {
    if (err.response && err.response.status === 429) {
      console.error("Rate limit exceeded. Please wait and try again.");
    } else {
      console.error(`Failed during searching people`, err);
    }
    return null;
  }
};

const extractPeoplesUsername = (data) => {
  const usernameList = [];
  if (data?.items) {
    data.items.forEach(person => {
      usernameList.push(person.username);
    });
  }
  return usernameList;
};

const searchAndGetPeopleInfo = async (keywords) => {
  const data = await getSearchPeopleData(keywords);
  const usernameList = extractPeoplesUsername(data);

  const peopleInfoList = [];
  for (const username of usernameList) {
    const person = await getPersonProfileInfo(username);
    if (person) peopleInfoList.push(person);
  }

  console.log(peopleInfoList);
  return peopleInfoList;
};



module.exports = {
  searchAndGetPeopleInfo
};

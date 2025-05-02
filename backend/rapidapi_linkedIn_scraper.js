const profileInfoAPI = require('./profileInfo');
const searchPeopleAPI = require('./searchPeople');

// Internal utility functions
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
};

const getSearchPeopleData = async (keywords) => {
  try {
    const response = await searchPeopleAPI.getResponse(keywords);
    return response.data.data;
  } catch (err) {
    console.error(`Failed during searching people`, err);
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

  return peopleInfoList;
};

// Exported function
const getInformationOfFilteredPeople = async (keywords, country, city) => {
  const peopleInfoList = await searchAndGetPeopleInfo(keywords);
  
  let filteredPeopleList = [];

  // TODO: Add filtering logic here based on `country` and `city`

  return filteredPeopleList;
};

module.exports = {
  getInformationOfFilteredPeople
};

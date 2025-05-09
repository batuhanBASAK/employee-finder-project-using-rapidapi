# employee-finder-project-using-rapidapi


Employee finder application that people can search by keywords such as location, job title, skills, and etc.


## Installation

### Database

Install zip file of the latest MongoDB community edition from this [link](https://www.mongodb.com/try/download/community)

Extract the zip file, and add the path of the bin directory, in the extracted directory, to $PATH environment varible.


### Backend


We need to create an .env file under backend directory

.env file must contains this variables

```.env
RAPIDAPI_KEY=<your_rapid_api_key_for_linked_scraper>

PORT=3000

JWT_SECRET=<your_jwt_secret_code>

ADMIN_EMAIL=<your_admin_email>
ADMIN_PASSWORD=<your_admin_password>
```

The application uses the linkedIn scrapper API [Real-Time LinkedIn Scraper API](https://rapidapi.com/rockapis-rockapis-default/api/linkedin-data-api/playground/apiendpoint_9f96c711-89f5-4866-8481-f36f459ff098)

You must sucbcribe this API and get the API key and put to the .env file.

You must also create token for JWT_SECRET. You can use following shell script to create one

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```


The Admins cannot register like how users do. Admin email and password must be added to .env file to create one.


Move to the backend directory and run following command which will install all necessary libraries for backend.
```bash
npm install
```


Next we need to create an admin and store him/her on database. To do this run adminCreationScript.js for once with followin command
```bash
node adminCreationScript.js
```


### Frontend

In front-end directory, run the following command to install all the necessary libraries

```bash
npm install
```



## Run

On three different terminal windows

Run this command to make up and run the database
```bash
sudo mongod --dbpath ~/data/db
```



Run this command to make up and run the backend (Note: you must on backend directory)
```bash
npm run start
```


Run this command to make up and run the frontend (Note: you must on frontend directory)
```bash
npm run dev
```



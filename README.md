# MovieReview
An app to review movies

Code Structure:
Controllers:  contains the routes. 
Core: contains the schemas and the models.
Tests: contains the automation test for the APIS endpoints.
config: contains the configurations files.
main.js: the server file.
 
Used Packages:
Express, body-parser, config 
mongoose, mongoose-unique-validator
jsonwebtoken, jwt-decode, bcrypt, joi
cross-env, jest, supertest

Npm Scripts:
npm start: start the app
npm test: change the congfiguration file to test file, connect to the test database and runs the automation tests 

Database Connections:
Development DB Url: 
mongodb+srv://dbUser:db123456@cluster0-azpdo.mongodb.net/development?retryWrites=true&w=majority

Test DB Url:
mongodb+srv://dbUser:db123456@cluster0-azpdo.mongodb.net/test?retryWrites=true&w=majority


Run the App Locally through:
http://localhost:8400 

Link the App on Heroku:
https://movies-review-app.herokuapp.com/  




Github repository:
https://github.com/abdelrahmanhanafy/MovieReview 

Routes:

Users Endpoints:
POST api/users/signup
POST api/users/login

Movies Endpoints:
GET api/movies
POST api/movies
DELETE api/movies/:id
PATCH api/movies/:id
GET api/movies?sortBy=${}&filterBy=${}
Example:
filterBy=action,2008&sortBy=1,1
1 means the ascending order 
-1 means descending order 

Reviews Endpoints:
GET api/reviews
POST api/reviews
DELETE api/reviews/:id
PATCH api/reviews/:id

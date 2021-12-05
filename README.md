# Soccr

![Soccr Home Page](https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634667933/soccr/MainPage_onmmde.png)

Soccr, a Flickr clone, is a website that allows users to search pictures about Soccer, create albums of pictures, and add comments to pictures. I built the site using React and Express. 

Visit the site at [https://soccr-aa.herokuapp.com/](https://soccr-aa.herokuapp.com/)

### Libraries and technologies
Soccr uses:

* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [BCrypt](https://github.com/dcodeIO/bcrypt.js) for password hashing

## Application Architecture

Soccr is built on a React frontent and an Express backend, which uses Sequelize to connect to a PostgreSQL database.

## Frontend Overview

Soccr uses several technologies on the front end to display and render data.

### Frontend Technologies Used

#### React

Soccr is a React application. All display logic is determined by React libraries, to give the user a single page experience. 

#### Redux

Soccr uses Redux to display and update state throughout the website. Redux is used with thunks to make API calls to the backend server to request and update data. 

## Backend Overview

Soccr uses an Express server with a PostgreSQL database, and uses Sequelize to retrieve and update data from the database.

### Backend Technologies Used

#### Express

Soccr uses Express as the backend server to handle incoming requests and respond with information from the database.

#### PostgreSQL

I used PostgreSQL as the database, as it is easy to setup and use, and the integration with Sequelize is efficient and easy to use.

#### BCrypt

BCrypt was used for hashing user passwords during sign up and authentication. No plain text passwords are stored in the database, only hashed passwords.

#### Sequelize

I used Sequelize as the ORM for Soccr, since it can quickly and efficiently integrate with PostgreSQL and Express. All database manipulation and seed data was implementing using Sequelize.

# Setup
To launch the application on your local machine:

* Download the code
* Navigate to the backend directory
* Run 'npm install'
* Create the database- 'npx dotenv sequelize db:create'
* Run the migration files- 'npx dotenv sequelize db:migrate'
* Run the seeder files- 'npx dotenv sequelize db:seed:all'
* In a seperate terminal, navigate to the frontend directory
* Run 'npm install' to launch the appplication

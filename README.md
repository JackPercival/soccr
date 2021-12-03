# soccr
Soccr, a [Flickr](https://www.flickr.com/) clone, is a website that allows users to search pictures about Soccer, create albums of pictures, and add comments to pictures. I built the site using React and Express. 

Visit the site at [https://soccr-aa.herokuapp.com/](https://soccr-aa.herokuapp.com/)

### Libraries and technologies
Soccr uses:

* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [BCrypt](https://github.com/dcodeIO/bcrypt.js) for password hashing

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

# soccr
Soccr, a [Flickr](https://www.flickr.com/) clone, is a website that allows users to search pictures about Soccer, create albums of pictures, and add comments to pictures.

[Link to live site](https://soccr-aa.herokuapp.com/)

[Link to Project wiki](https://github.com/JackPercival/soccr/wiki)

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

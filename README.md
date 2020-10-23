# Draft!

The project is made with **React Js** on the frontend, **NodeJs** on the backend and the database with **MYSQL**.

## REACT
- In REACT we used:
- REDUX for managing global states
- AXIOS to carry out HTTP requests

## DO NOT GIVE
- In NODE we used:
- EXPRESS which is a framework that makes working with NODE easier
- MULTER to save files
- SEQUELIZE for connection with MYSQL
- JSON WEB TOKEN to generate the authentication token

# Raise the Backend

- Enter the **node** folder, then perform **npm install** and wait for the dependencies to download
- The file **.env.example** must be renamed, with the name **.env**
- Create the Database with the name **test**
- Perform **npm run init-db** to initialize the MySql database
- Verify that the database has been created
- Do **npm start** to lift the backend which will do it in **localhost:8000**

# Raise the Frontend

- Enter the **react** folder, then perform **npm install** and wait for the dependencies to download
- The file **.env.example** must be renamed, with the name **.env**
- Do **npm start** to raise the frontend which will do it in **localhost:3000**

# API documentation in Swagger

- First you must do the steps mentioned to raise the Backend
- Then just go to **localhost:8000/api-auth**

# Jenkins (previously you have to have it installed)

- First you must do the steps mentioned to raise the Backend
- Then just go to **localhost:8080**

# Dockerize the project

- A Dockerfile has been prepared for each project and a Docker-Compose to lift the containers together
- You must stand in the **node** folder and do **docker build -t node-api: 0.1.0.** to create the NODE image
- You must stand in the **react** folder and do **docker build -t react-web: 0.1.0.** to create the REACT image
- Then from the root folder you must do **docker-compose up -d** and ready the 2 containers will be up and connected
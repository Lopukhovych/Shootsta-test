# Test shootsta task

### Project consist of two parts:
 1. Frontend client with react 
 2. API/server with express, graphql. Also was used postgresQL and sequelize 
 
###Frontend consist pages:
 1. List of videos
 2. Upload video
 3. Video page
 4. Edit video
 
###Server could handle:
 1. Video uploads
 2. Storing videos
 3. Retrieve video item and video list
 4. Edit video
 
###Stylization
 1. Bootstrap is used for layout and style components
 2. Css us used for custom styles
 
###Setup
For running App we need to have postgresQL, node, npm and good mood)

[Install postgres][postgresi] \
[Nodejs postgres][nodei]

Then open your terminal in project root path and run 

```sh
$ sh setup-db.sh
$ sh build-project.sh
```
In `setup-db.sh` we create database and a user for our app. 
Then install [Sequelize][sequelize] and run all migrations.
You can do it manually.

In `build-project.sh` we just build client, move build to our backend directory and run server.
Here we use only development environment. For prod will be used [PM2][pm2] 

Your server should run on http://localhost:3200/

[postgresi]: <https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3> 
[nodei]: <https://nodejs.org/en/download/> 
[sequelize]: <https://sequelize.org/> 
[pm2]: <https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/>




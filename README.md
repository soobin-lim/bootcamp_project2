## Setup for Local Machine
1. Create database: travelSecure_development
2. Execute npm install
3. Run application using npm start or nodemon start
4. Go to localhost:3000
5. [Live Application](https://safe-wildwood-89882.herokuapp.com/)


# heroku 
git push heroku main

# heroku logging
https://devcenter.heroku.com/articles/logging
heroku logs --tail

# Automatic dyno restarts
The dyno manager restarts all your app’s dynos whenever you:

create a new release by deploying new code
change your config vars
change your add-ons
run heroku restart
https://devcenter.heroku.com/articles/dynos#automatic-dyno-restarts

# Sequelize Migration
https://sequelize.org/master/manual/migrations.html
Creating the first Model (and Migration)
Creating the first Model (and Migration)
Once you have properly configured CLI config file you are ready to create your first migration. It's as simple as executing a simple command.

We will use model:generate command. This command requires two options:

name: the name of the model;
attributes: the list of model attributes.
Let's create a model named User.

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
This will:

Create a model file user in models folder;
Create a migration file with name like XXXXXXXXXXXXXX-create-user.js in migrations folder.
Note: Sequelize will only use Model files, it's the table representation. On the other hand, the migration file is a change in that model or more specifically that table, used by CLI. Treat migrations like a commit or a log for some change in database.

# heroku

# sequelize cli
https://stackoverflow.com/questions/43099808/bash-sequelize-command-not-found


web: ./bin/www npm start
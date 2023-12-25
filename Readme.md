# To do Backend REST API 

---
## Requirements

For development, you will only need Node.js, MongoDB, npm, installed in your environement.

### Node
  To build this project node version (v18.17.0) and npm version (9.6.7) was used.

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

### MongoDB
  You can download mongoDB using following resources.

- #### MongoDB installation     
    1) Official MongoDB website (https://www.mongodb.com/try/download/community)
    2) Using homebrew brew tap mongodb/brew
    3) Using docker image docker pull mongo

If the installation was successful, you should be able to run the following command.

    $ node --version
    v18.17.0

    $ npm --version
    9.6.7

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g



## Install

    $ git clone https://github.com/point8290/TodoBackend.git
    $ cd TodoBackend
    $ npm install

## Configure app

  Create a environment variable file (.env) in main folder (TodoBackend) Copy below lines and paste in .env file

    PORT=SERVER_PORT 
    DB_USERNAME=YOUR_MONGODB_USERNAME
    DB_USER_PASSWORD=YOUR_MONGODB_PASSWORD
    DB_NAME=MONGODB_DATABSE_NAME
    JWT_SECRET_KEY=SECRET_KEY_TO_GENERATE_JWT_TOKEN

## Running the project

    $ npm start

## Simple build for production

    $ npm run build


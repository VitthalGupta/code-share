# Code / Share

Sharing Code and other documents by just adding your code to the site is a great way to share code and documents.

## Stack Used
### MERN Stack

Frontend: React 
    hosted on heroku: https://damp-brook-52601.herokuapp.com/

Backend: Express Node.js
    hosted on heroku: https://agile-reef-63966.herokuapp.com/

DataBase: MongoDB
    hosted on mongoDB Atlas

## How to setup Website

### Clone the repository
```
git clone https://github.com/VitthalGupta/code-share.git
```
### Setting up the database

- Setup your mongoDB Atlas account
- Create a database called code-share
- Create a collection called urls
- update the ATLAS_URI in the server/congif.env file
- check if the PORT is available
- 
### Setting Up the server

```
cd server/
npm install
nodemon server.js
```
### Setting up the client
```
cd ..
cd client/
npm install
npm start
```
## UI
![main.js](https://github.com/VitthalGupta/code-share/blob/main/assets/Screenshot%202022-02-18%20at%206.58.50%20AM.png)
![main.js with data](https://github.com/VitthalGupta/code-share/blob/main/assets/Screenshot%202022-02-18%20at%206.58.50%20AM.png)
![show.js](https://github.com/VitthalGupta/code-share/blob/main/assets/Screenshot%202022-02-18%20at%206.58.50%20AM.png)
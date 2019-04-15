# Weather Forecast SPA - Authentication Server 

This is a simple [express][express] REST server which supports validating the user via email&password pair or jtw token. The server is living on firebase cloud function service.


## Restful API Sample Request and Response:
* POST: https://us-central1-weather-app-c8787.cloudfunctions.net/app/signup
```json
header: {
	"Content-Type": "application/json"
}

body: {
	"email": "<emailAddressHere>",
	"password": "<passwordHere>"
}

response: {
	"status": "201",
	"token": "<encryptedTokenHere>"
}
```
* POST: https://us-central1-weather-app-c8787.cloudfunctions.net/app/signin
```json
header: {
	"Content-Type": "application/json"
}

body: {
	"email": "<emailAddressHere>",
	"password": "<passwordHere>"
}

response: {
	"status": "200",
	"token": "<encryptedTokenHere>"
}
```
* get: https://us-central1-weather-app-c8787.cloudfunctions.net/app/checkToken
```json
header: {
	"authorization": "<yourTokenHere>"
}

response: {
    "data": "authenticated"
}
```

<br>

## Project Organization

```bash
.
├── README.md
├── config
│   └── config.js
├── controllers
│   └── authentication.js
├── index.js
├── models
│   └── user.js
├── package-lock.json
├── package.json
└── services
    └── passport.js
```
<br>

## Dependency Installed

The table below shows the dependencies involved (except installed by create-react-app) in this frontend app.


| Dependency |  Purpose |
| ------ | ------ |
| [express][express] | Node.js web application  |
| [passport][passport]  | Passport is authentication middleware for Node.js|
| [passport-jwt][jwt]  | A Passport strategy for authenticating with a JSON Web Token.|
| [passport-local][local] | Username and password authentication strategy for Passport and Node.js|
| [jwt-simple][jwt-simple] | JWT(JSON Web Token) encode and decode module for node.js |
| [mongoose][mongoose] |  mongodb object modeling for node.js |
| [morgan][morgan] | HTTP request logger middleware for node.js |

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job.)

   [express]: <https://expressjs.com>
   [passport]: <http://www.passportjs.org/>
   [jwt]: <http://www.passportjs.org/packages/passport-jwt>
   [local]: <https://github.com/jaredhanson/passport-local>
   [jwt-simple]: <https://www.npmjs.com/package/jwt-simple>
   [mongoose]: <https://mongoosejs.com/>
   [morgan]: <https://github.com/expressjs/morgan>

<br>

## Installation

This project uses [Mongodb altas] as database. To run this server, you need to have a mongodb service running and configure the mongoose.connect to connect to your db service. 

Create a new js file functions/config/config.js and export your mongbe connection string and a secret key string for jwt. 

The default way to create an express app was also changed in order to make this project deployable to firebase cloud functions.


### To run it as a normal express app.
Change:
```javascript
exports.app = functions.https.onRequest(app);
```
To:
```javascript
const port = process.env.PORT || 3090;
const server = createServer(app);
server.listen(port);
```
Install the dependencies and start the app.
<br>

```sh
$ cd functions
$ npm install
$ node index.js
```
### To run it on firebase cloud function service.

Make sure you have firebase CLI installed.
```sh
$ firebase init
```
To connect to your firebase app.
Edit the firebase.json file to bind the sources to app function.
```sh
$ firebase deploy --only functions
```
To deploy your express app to firebase cloud function service.


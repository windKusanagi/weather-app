# Weather Forecast SPA - Frontend 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

Try this [live demo here][demo].

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>

### `npm run eject`

This command will remove the single build dependency from your project.

<br>

## Project Organization

```bash
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.css
│   ├── App.js
│   ├── Root.js
│   ├── components
│   │   ├── auth
│   │   │   ├── signin
│   │   │   │   ├── Auth.scss
│   │   │   │   ├── Signin.js
│   │   │   │   └── SigninForm.js
│   │   │   └── signup
│   │   │       ├── Signup.js
│   │   │       └── SignupForm.js
│   │   ├── hoc
│   │   │   └── requireAuth.js
│   │   ├── home
│   │   │   ├── Home.js
│   │   │   ├── Home.scss
│   │   │   ├── leftPanel
│   │   │   │   ├── LeftPanel.js
│   │   │   │   ├── LeftPanel.scss
│   │   │   │   ├── autoComplete
│   │   │   │   │   ├── AutoComplete.js
│   │   │   │   │   └── AutoComplete.scss
│   │   │   │   └── cityList
│   │   │   │       ├── CityList.js
│   │   │   │       └── CityList.scss
│   │   │   └── rightPanel
│   │   │       ├── RightPanel.js
│   │   │       ├── RightPanel.scss
│   │   │       ├── currentWeather
│   │   │       │   ├── CurrentWeather.js
│   │   │       │   └── CurrentWeather.scss
│   │   │       ├── fiveDayForecast
│   │   │       │   ├── FiveDayForecast.js
│   │   │       │   └── FiveDayForecast.scss
│   │   │       └── oneDayForecast
│   │   │           ├── OneDayForecast.js
│   │   │           └── OneDayForecast.scss
│   │   ├── layouts
│   │   │   └── headers
│   │   │       ├── Header.js
│   │   │       └── Header.scss
│   │   └── widget
│   │       ├── ErrorSnackbar.js
│   │       └── LoadingCircle.js
│   ├── config
│   │   └── config.js
│   ├── index.js
│   ├── serviceWorker.js
│   ├── static
│   │   ├── days.js
│   │   └── svgPathHelper.js
│   └── store
│       ├── actions
│       │   ├── authActions.js
│       │   ├── index.js
│       │   ├── userActions.js
│       │   └── weatherActions.js
│       └── reducers
│           ├── authReducer.js
│           ├── rootReducer.js
│           ├── userReducer.js
│           └── weatherReducer.js
└── yarn.lock
```
<br>

## Dependency Installed

The table below shows the dependencies involved (except installed by create-react-app) in this frontend app.


| Dependency | Verson | Purpose |
| ------ | ------ | ------ |
| [@material-ui/core][core] | 3.9.3 | Google material design theme |
| [@material-ui/icons][icons] | 3.0.2 | Goggle material desgin icons|
| [axios][axios] | 0.18.0 | Promise based HTTP client |
| [classnames][classnames] | 2.2.6 | Joining classNames together|
| [lodash][lodash] | 4.17.11 | Modern JavaScript utility |
| [react-places-autocomplete][autocomplete] | 7.2.1 | Google place api service for react |
| [redux][redux] | 4.0.1| State container for JS app |
| [react-redux][react-redux] | 7.0.1 | Binding react for redux |
| [react-router-dom][react-router-dom] | 5.0.0 | React router |
| [redux-thunk][redux-thunk] | 2.3.0 | Thunk middleware for redux action |
| [node-sass][node-sass] | 4.11.0| Use scss in this app |
| [validator][validator] | 10.11.0 | Validating javascript objects |

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job.)

   [demo]: <https://weather-app-c8787.firebaseapp.com/>
   [core]: <https://material-ui.com/>
   [icons]: <https://material.io/tools/icons/?style=baseline>
   [axios]: <https://github.com/axios/axios>
   [classnames]: <https://github.com/JedWatson/classnames>
   [lodash]: <https://lodash.com/>
   [autocomplete]: <https://github.com/hibiken/react-places-autocomplete>
   [redux]: <https://redux.js.org/>
   [react-redux]: <https://github.com/reduxjs/react-redux>
   [react-router-dom]: <https://www.npmjs.com/package/react-router-dom>
   [redux-thunk]: <https://github.com/reduxjs/redux-thunk>
   [node-sass]: <https://github.com/sass/node-sass>
   [validator]: <https://validatejs.org/>


<br>

## Installation

Create a new js file src/config/config.js and export your openweathermap api key there. <br>
```javascripts
export const weatherApiKey = "<you-app-api-key>"
```
Install the dependencies and start the app. A simple authentication server has been deployed to firebase cloud functions, so you can just install and try this frontend code without worrying about the server stuff 😀.

```sh
$ cd client
$ npm install
$ npm start
```

## Test User
The app requires to signin/signup with email and password, you can login with the test account below:
```json
{
    "email": "text@example.com",
    "password": "12345678"
}
```
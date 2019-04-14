# Weather Forecast SPA - Frontend 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

The table below shows the dependencies invloved (except installed by create-react-app) in this frontend app.


| Plugin | Verson | Porpose |
| ------ | ------ | ------ |
| @material-ui/core | ^3.9.3 | |
| @material-ui/icons | ^3.0.2 | |
| axios | ^0.18.0 | |
| classnames | ^2.2.6 | |
| lodash | ^4.17.11 | |
| react-places-autocomplete | ^7.2.1 | |
| redux | ^4.0.1| |
| react-redux | ^7.0.1 | |
| react-router-dom |  | |
| redux-thunk |  | |
| node-sass | ^4.11.0| |
| validator | | |
# Weather Forecast SPA Project Summary

## Goals and Objectives
This project is aimed to build a single page weather forecast application using React. The app needs to have two main panels, one for adding or selecting cities and the other is for displaying weather report for the selected city. 

* This app requires to validate the name of cities, but there are many cities that share the same name while locates in different countries (e.g. Halifax, NS, CA and Halifax, UK ). **The openweathermap api does support searching by city name, but it can not determine which city the user wants to check unless appending country info in the request params**. So this app will use google place api (autocomplete api) to validate cities and use geo coordinates to fetch city weather.

* This app will use [Google material-ui][material-ui] theme to as the default UI theme.

* This app will have responsive a UI, which means it will adjust itself according to the window size.

* This app will show the current weather report (use openweatheramp [current weather data api][current]), the weather in the next 24 hours ( use openweatheramp [hourly forecast api][hour]), as well as the weather in the next five days (use openweatheramp [16 day weather forecast][day]).

* This app will use [Redux][redux] to do the state management job.

* This app will have an authenication mechanism as well as router guards for different user roles.

<br>

## Live Demo or Install Locally

I have deployed this SPA to firebase cloud hosting service. The backend is also hosted on cloud function service. So you can directly test it [here][live-demo] without installing and running both the frontend and server locally.

The app requires to signin/signup with email and password, you can login with the test account below:
```json
{
    "email": "text@example.com",
    "password": "12345678"
}
```

But if you prefer to try it locally, please read the README files under both [/client][client] and [/functions][functions] respectively. Make sure you have necessary config files (openweathermap api key, mongdb connection string and a scret key for jwt encodeing/decoding ) added to your work space.


<br>

## Functionality  Illustration

### Illustration for functionalities required

1. Type a city name in the input then click + button to call weather endpoint to validate city name.

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Ftype-city-name.gif?alt=media&token=ca86553f-81de-458b-a9ca-28a003c11979)

    >The name of the city is validated by google place api, the search scope has been limited to cities, which will only try to match locality or administrative_area3 in google map api. The matching process has been debounced to 200ms, which will have a small delay but still give real-time match result.

<br>

2. If the city name is valid it should be added to the list below under Recent Locations. If a city is invalid an error message should appear and the city should not be added to the list. && Adding a new location should be added to the top of the list. && The cities in the Recent Locations list should show last temperature and the weather status (an Icon is a bonus).

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fvalidate-adn-add-to-list.gif?alt=media&token=3390fe1b-ba09-49f6-80df-7bfae92fbbd4)

    >As shown in the gif, if a city name is valid (validate by google place api), then click on the blue + button will add the city into the top of the list. And the right panel will show the weather report for the newly added city. But if the name is an invalid name, if the user press enter then a error message will show up in the mid-top of the screen. Each city in the list will also show the current temperature and current weather (indiciated by an animated weather icon).

<br>

3. Click on the Refresh button (on the left Panel) should update the weather reading at this particular location. &&  Click on the Refresh button (on the right panel) should refresh weather forecast reading.

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fupdate-weather.gif?alt=media&token=c21f66a0-3a40-4dd2-af95-c6a550db2243)

    >As shown in the gif, click on the refresh button for each city will refresh the data rendered on the city item. And click on the refresh button on the right panel will refresh all the data rendered on the right. Both actions will call the openweather map api to retrieve the latest data. Note: click on the refresh button will not result in changing the view of the right panel, only click on the city item itself does.

<br>

4. Click on X button should remove a location from the list.

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fremove-from-list.gif?alt=media&token=dcaa7c08-aacf-4cdd-8187-c4c7b37d14bd)

    >As shown in the gif, click on the delete button at the end of each city item will remove the city from the list. If the right panel is not showing the city which is just deleted, it will remain unchanged. But if the right panel is showing the deleted city, then the right panel will show an empty message. Click on a city item or add a new city will update the right panel. 

<br>

5. Click on the list item should Call a forecast API and populate right panel according to the layout.

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fswitch-city.gif?alt=media&token=81f4c684-6ac1-4fa2-b011-23725a1de00a)

    >As shown in the gif, click on the list item will call all related api (current weather, hours weather and daily weather api) and update the data on the right panel.

<br>

6. Click on the Clear button should remove all locations form the list.

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fremove-all.gif?alt=media&token=f4007dfc-d269-462d-b07e-ca781a6f3dd1)

    >As shown in the gid, click on the 'clear all' button (only visible when the list is not empty) will remove all the cities.

<br>

7. Only 8 locations should be added, the ninth location should be pushed to the top of the list and the one on the bottom removed.

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fmax-8-cities.gif?alt=media&token=509a6bd6-d523-406f-8d8c-7635780bcf56)
        
    >As shown in the gif, adding an existing city will show a duplicated city error, but adding a valid city if there are already 8 cities in the list. The new city will be pushed to the top and the one on the bottom got removed.

<b>

### Illustration for extra functionalities

1. User authentication

    1.1 Sign in

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2FSignin.gif?alt=media&token=c0221821-71f3-4a8c-8529-8fbd53565424)

    >It has a debounced event which checks if the email and password are valid.
    
    <br>
    
    1.2 Sign up

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fsignup.gif?alt=media&token=a9e4449d-f134-4c3a-a50c-f704f873e58e)

    >It has a debounced event which checks if the email, password and repeated password are valid.
    
    <br>
    
    1.3 Router Guards
    
    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Frouter-guards.gif?alt=media&token=6af4a485-9942-4d0c-8199-a8a1d01bc389)

    >As shown in the gif, when the user has signed in, he doesn't have the access to signin (/signin) or signup page (signup). When the has not signed in, he can not access to the home page (/)

<br>

2. Responsive UI 
    
    2.1 Auth Page

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fresponsive-auth.gif?alt=media&token=e17aa52b-64d2-4103-8ffe-13a1ce843839)

    2.2 Main Page

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fresponsive-main.gif?alt=media&token=eccd2cd2-42a2-4593-96ed-7ad7f59b5ee7)

    >As shown in the gif, the left panel will be hidden and be presented as a left drawer on the screen. Click on the menu button on the app bar to toggle the drawer. 


<br>

3. Load your current GPS and show weather forecast when first time using this app

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Floading-default.gif?alt=media&token=95f0098e-515b-4981-b50a-4f484500f365)

    >When first-time using the app, it will request for the navigator.geolocation access. Then it will use your current geo coordinates and fetch the weather data of your current city. 


<br>

4. Google Place Autocomplete
    >Has been shown in the Illustration for functionalities required part.

<br>

5. Next 24 hours' weather

    ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2F24-hrs.gif?alt=media&token=b0c45353-d8cc-4faa-aacf-ccbb34bd575b)

    >As shown in the gif, the app will also retrieve the next 24 hours' weather report based on the geo coordinates you provided.


<br>

## Work Progress

| Day | Date | working hours | Progress |
| ------ | ------ | ------ |------ |
| Day 1| Apr.8 Mon | Evening time | Project design && implement and deploy a simple express server to firebase cloud function service. |
| Day 2| Apr.9 Tue| Evening time| Implement the basic seed create-react-app && setup basic routes && implement auth page && connect to the express backend && router guards.  |
| Day 3 | Apr.10 Wed| Evening time | Implement basic layout of the home page && setup Google place api services && implement Google cities autocomplete search bar |
| Day 4 | Apr.11 Thu| Evening time| Fetch weather data from openweatheramp api && implement the current weather data and the next five days' weather data |
| Day 5 | Apr.12 Fri| Evening time| Implement 24hrs view && implmenet city list view && connect the city list view (left panel) to the weather report view (right panel) |
| Day 6 | Apr.13 Sat| All day| Implement responsive UI for all the components && Test/debug |
| Day 7 | Apr.14 Sun| All day | Clean up the project && write Documents |
| Day 8 | Apr.15 Mon| day time| Write Documents && project delivery |


<br>

## Issus Encountered

1. Openweathermap API Issues

    * The openweathermap API will work pretty well in most of the time, but sometimes it replied with Internal Error message which would cause some problems on frontend app.

    * The precision of the [openweathermap daily weather api][day] is questionable.
        
        ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Ftrue-result.png?alt=media&token=26ea3f36-2f16-4c4d-a377-c1e61ee24fe8)

        >The weather report of Halifax should be close to the data above (data is from weather.com).  While the weather forecast data from openweathermap is shown in the screenshot below.

        ![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fopenweathermap-result.png?alt=media&token=1d3b1fa7-d78a-43fd-96cc-eee9b32597da)

        >Those two forecasts are quite different from each other regarding max-temp, min-temp and weather description. It cost me relatively long time to figure out why the daily weather data I got from the openweathermap api was kind of weird. But in the end I was still using the daily weather data returned by openweathermap api for rendering the content.
    
    * The timestamp of the target city in [openweathermap hour api][hour].

        >You may notice that the time on all the cities is actually your local time (in 24 hours' weather view). This is because the api will only return a string in UTC time to present the local time in the target city (dt_txt in the json example below).

        ```json
        "list": [
        {
            "dt": 1555351200,
            "main": {
                "temp": 283.32,
                "temp_min": 283.318,
                "temp_max": 283.32,
                "pressure": 997.585,
                "sea_level": 997.585,
                "grnd_level": 997.566,
                "humidity": 100,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 12.75,
                "deg": 209.892
            },
            "rain": {
                "1h": 0.313
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2019-04-15 18:00:00"
        },

        ```

        >To get the current local time in the target city, I probaly need to call some other services like Google timezone service to translate this UTC time to local time. I didn't implement that because of the short DDL. So I just convert the UTC string to the user's current time with an offset and make sure the DATE and MONTH are correct.

<br>

## Limitation and Future Plan

1. Backend Performance Issue
    
    I had deployed a [simple express server][server] to Google firebase cloud function service and connect it to Mongdb Altas as database. The reasons of doing this instead of providing a docker image are:

    * I'd like to use JWT authentication method for this app, and it is easy to implement a simple express server with passport lib to do that. More importantly, I was trying to do more things on the backend besides auth in the beginning, and a RESTFul server might be helpful.  

    * The requirement doc only talked about the frontend and didn't ask for an authentication process.
    So it should be better that we have a deployed running server and we can talk to the server without install it locally.

    * I had deployed this SPA to firebase cloud hosting, and I also used the Google Geocoding API (place api) in the app. Furthermore, all the gif and images for the Docs are all hosted on firebase cloud storage. So basically everything is wrapped by a firebase app. Which is easier to maintain , monitor, even setup Google Analytics in the future.

    But the performance of the server is not optimal, sometimes it even took a few seconds to authenticate a user. I didn't have enough time to change it to a standard express app and dockerized it.

    So in the future plan for this app, I plan to either:
    
    * Deploy a docker app instead of the firebase cloud functions to some cloud services.

    * Get rid of the backend server and use cloud services like firebase which provides user authentication and real-time database (firebase realtime DB or firestore.).  

    And I can also implement more meaningful user profile and save the search history for each user on the backend.
    
3. Error Handling on Frontend

    I am using axios (promise based) http requests everywhere in the app and use redux to manage almost all the data flow. But there are still a few unhandled error cases (e.g. Internal error from openweathermap or the express server) need to be taken care of. So in the future work, I will take care of every possible error response and show corresponding error message on the frontend app.

3. Testing.

    There is no test case in this app. Initially, I was planning to test the app using Jest and Enzyme but things had become too complicated to add test cases later. And honestly, I am also not professional in Jest or Enzyme yet. So I would like to implement Jest/Enzyme test cases for the app in the future work.  

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job.)

   [live-demo]: <https://weather-app-c8787.firebaseapp.com>
   [client]: <https://github.com/windKusanagi/weather-app/tree/master/client>
   [functions]: <https://github.com/windKusanagi/weather-app/tree/master/functions>
   [material-ui]: <https://material-ui.com/>
   [current]: <https://openweathermap.org/current/>
   [hour]: <https://openweathermap.org/api/hourly-forecast>
   [day]: <https://openweathermap.org/forecast16>
   [redux]: <https://redux.js.org>
   [server]:<https://github.com/windKusanagi/weather-app/tree/master/functions>


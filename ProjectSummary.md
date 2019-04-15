# Weather Forecast SPA Project Summary

## Goals
This project is aimed to build a single page weather forecast application using React. The app needs to have two main panels, one for adding or selecting cities and the other is for displaying weather report for the selected city. The app will use redux to do the state management job.

This app requires to validate name of cities, but there are many cities that share the same name but locates in different countries (e.g. Halifax, NS, CA and Halifax, UK ). **The openweathermap api does support searching by city name, but it can not determine which city the user wants to check unless appending country info in the request params**. So this app will use google place api (autocomplete api) to validate cities and use geo coordinates to fetch city weather.

This app will use [Google material-ui][material-ui] theme to as the default UI theme.

This app will show the current weather report (use openweatheramp [current weather data api][current]), the weather in the next 24 hours ( use openweatheramp [hourly forecast api][hour]), as well as the weather in the next five days (use openweatheramp [16 day weather forecast][day]).

This app will use [Redux][redux] to do the state management job.

This app will have a authenication mechanism and will have router guards if the user hasn't signed in.

<br>

## Functionality  Illustration

### Illustration for functionalities required

1. Type a city name in the input then click + button to call weather endpoint to validate city name.

![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Ftype-city-name.gif?alt=media&token=ca86553f-81de-458b-a9ca-28a003c11979)

    The name of the city is validated by google place api, the search scope has been limited to cities, which will only try to match locality or administrative_area3 in google map api. The match process has been debounced to 200ms, which will have a small delay but still give real-time match result.

<br>

2. If the city name is valid it should be added to the list below under Recent Locations. If a city is invalid an error message should appear and the city should not be added to the list. && Adding a new location should be added to the top of the list. && The cities in the Recent Locations list should show last temperature and the weather status (an Icon is a bonus).

![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fvalidate-adn-add-to-list.gif?alt=media&token=3390fe1b-ba09-49f6-80df-7bfae92fbbd4)

    As shown in the gif, if a city name is valid (validate by google place api), then click on the blue + button will add the city into the top of the list. And the right panel will show the weather report for the new added city. But if the name is an invalid name, if the user press enter then a error message will show up in the mid top of the screen. Each city in the list will also show the current temperature and current weather (indiciated by a animated weather icon).

<br>

3. Click on the Refresh button (on the left Panel) should update the weather reading at this particular location. &&  Click on the Refresh button (on the right panel) should refresh weather forecast reading.

![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fupdate-weather.gif?alt=media&token=c21f66a0-3a40-4dd2-af95-c6a550db2243)

    As shown in the gif, click on the refresh button for each city will refresh the data rendered on the city item. And click on the refresh button on the right panel will refresh all the data rendered on the right. Both acitons will call the openweather map api to retrieve the latest data. Note: click on the refresh button will not result in changing the view of the right panel, only click on the city item itself does.

<br>

4. Click on X button should remove a location from the list.

![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fremove-from-list.gif?alt=media&token=dcaa7c08-aacf-4cdd-8187-c4c7b37d14bd)

    As shown in the gif, click on the delete button at the end of each city item will remove the city from the list. If the right panel is not showing the city which is just deleted, it will remain unchanged. But if the right panel is showing the deleted city, then the right panel will show empty message. Click on city or add a new city will update the right panel. 

<br>

5. Click on the list item should Call a forecast API and populate right panel according to the layout.

![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fswitch-city.gif?alt=media&token=81f4c684-6ac1-4fa2-b011-23725a1de00a)

    As shown in the gif, click on the list item will call all realted api (current weather, hours weather and daily weather api) and update the data on the right panel.

<br>

6. Click on the Clear button should remove all locations form the list.

![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fremove-all.gif?alt=media&token=f4007dfc-d269-462d-b07e-ca781a6f3dd1)

    As shown in the gid, click on the clear all button (only visible when the list is not empty) will remove all the cities

<br>

7. Only 8 locations should be added, the ninth location should be pushed to the top of the list and the one on the bottom removed.

![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fmax-8-cities.gif?alt=media&token=509a6bd6-d523-406f-8d8c-7635780bcf56)
    
    As shown in the gif, adding a existing city will show a duplicated city error, but adding a valid city if there are already 8 cities in the list. The new city will be pushed to the top and the one on the bottom got removed.

<br>

### Illustration for extra functionalities


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job.)

   [material-ui]: <https://material-ui.com/>
   [current]: <https://openweathermap.org/current/>
   [hour]: <https://openweathermap.org/api/hourly-forecast>
   [day]: <https://openweathermap.org/forecast16>
   [redux]: <https://redux.js.org>


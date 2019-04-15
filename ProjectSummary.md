# Weather Forecast SPA Project Summary

## Goals
This project is aimed to build a single page weather forecast application using React. The app needs to have two main panels, one for adding or selecting cities and the other is for displaying weather report for the selected city. The app will use redux to do the state management job.

This app requires to validate name of cities, but there are many cities that share the same name but locates in different countries (e.g. Halifax, NS, CA and Halifax, UK ). So this app will use google place api (autocomplete api) to validate cities and use geo coordinates to fetch city weather.

## Functionality  Illustration

### Illustration for functionalities required
1. Type a city name in the input then click + button to call weather endpoint to validate city name.

![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Ftype-city-name.gif?alt=media&token=b5314436-2d00-4724-a6a4-5f45bb1664a1)

    The name of the city is validated by google place api, the search scope has been limited to cities, which will only try to match locality or administrative_area3 in google map api. The match process has been debounced to 200ms, which will have a small delay but still give real-time match result.

2. If the city name is valid it should be added to the list below under Recent Locations. If a city is invalid an error message should appear and the city should not be added to the list. && Adding a new location should be added to the top of the list.


3. The cities in the Recent Locations list should show last temperature and the weather status (an Icon is a bonus).

4. Click on the Refresh button should update the weather reading at this particular location.

5. Click on X button should remove a location from the list.


6. Click on the list item should Call a forecast API and populate right panel according to the layout.

7. Click on the Clear button should remove all locations form the list.

8. Only 8 locations should be added, the ninth location should be pushed to the top of the list and the one on the bottom removed.

10. Click on the Refresh button should refresh weather forecast reading.

![](https://firebasestorage.googleapis.com/v0/b/weather-app-c8787.appspot.com/o/summary-gif%2Fupdate_weather.gif?alt=media&token=76819ecf-d250-435f-8cf8-950095ad7db3)



### Illustration for extra functionalities


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job.)

   [client]: <https://github.com/windKusanagi/weather-app/tree/master/client>
   [server]: <https://github.com/windKusanagi/weather-app/tree/master/functions>


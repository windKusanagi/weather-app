import axios from "axios";
import { weatherApiKey } from "../../config/config";
import {
	ADD_CITY_DATA_FAILED,
	ADD_CITY_DATA_SUCCESS,
	REMOVE_CITY_FROM_LIST,
	STOP_FETCHING_DEFAULT,
	FETCH_ALL_WEATHER_DATA_FAILED,
	FETCH_ALL_WEATHER_DATA,
	UPDATE_CITY_ITEM_WEATHER,
	UPDATE_CITY_ITEM_WEATHER_FAILED,
	UPDATE_ERROR_MSG,
	RESET_ERROR_MSG,
	CLEAR_ALL_CITIES
} from "./index";

const cur_weather_api_base = "https://api.openweathermap.org/data/2.5/weather?";
const five_day_api_base =
	"https://api.openweathermap.org/data/2.5/forecast/daily?";
const one_day_api_base =
	"https://api.openweathermap.org/data/2.5/forecast/hourly?";

// Update error msg and show it in snackbar	
export const updateErrorMsg = msg => {
	return {
		type: UPDATE_ERROR_MSG,
		payload: msg
	};
};

// Clear error msg
export const resetErrorMsg = () => {
	return {
		type: RESET_ERROR_MSG
	};
};

// Add a city into city list
export const addCityIntoList = cityData => {
	return (dispatch, getState) => {
		const state = getState();
		let isExist = false;

		// check if the city is already in the list
		for (let el of state.weather.cityList) {
			if (el.id === cityData.id) isExist = true;
		}
		if (isExist) {
			dispatch({
				type: ADD_CITY_DATA_FAILED,
				payload: "City is already in the list"
			});
		} else {
			dispatch({
				type: ADD_CITY_DATA_SUCCESS,
				payload: cityData
			});
		}
	};
};

// Remove a city from the list by city id
export const removeCityFromList = id => {
	return {
		type: REMOVE_CITY_FROM_LIST,
		payload: id
	};
};


export const stopFetchingDefault = () => {
	return {
		type: STOP_FETCHING_DEFAULT
	};
};

// get all weather data including current weather, weather in the 
// next 24 hrs and weather for the nect five days
export const fetchAllWeatherData = (latLon, id) => {
	return dispatch => {
		const promiseSet = [];
		promiseSet.push(
			axios.get(
				`${cur_weather_api_base}lat=${latLon.lat}&lon=${
					latLon.lon
				}&appid=${weatherApiKey}`
			)
		);
		promiseSet.push(
			axios.get(
				`${one_day_api_base}lat=${latLon.lat}&lon=${
					latLon.lon
				}&appid=${weatherApiKey}&cnt=24`
			)
		);
		promiseSet.push(
			axios.get(
				`${five_day_api_base}lat=${latLon.lat}&lon=${
					latLon.lon
				}&appid=${weatherApiKey}&cnt=5`
			)
		);
		Promise.all(promiseSet)
			.then(vals => {
				dispatch({
					type: FETCH_ALL_WEATHER_DATA,
					payload: {
						current: vals[0].data,
						oneDay: vals[1].data,
						fiveDay: vals[2].data,
						id
					}
				});
			})
			.catch(err => {
				console.log(err);
				dispatch({
					type: FETCH_ALL_WEATHER_DATA_FAILED,
					payload: err.response.data
				});
			});
	};
};

// Update the current temperature for the city in the city list 
export const updateCityItemWeather = idx => {
	return (dispatch, getState) => {
		const cityList = getState().weather.cityList;
		const latLon = cityList[idx].latLon;
		axios
			.get(
				`${cur_weather_api_base}lat=${latLon.lat}&lon=${
					latLon.lon
				}&appid=${weatherApiKey}`
			)
			.then(res => {
				return dispatch({
					type: UPDATE_CITY_ITEM_WEATHER,
					payload: {
						data: res.data,
						index: idx
					}
				});
			})
			.catch(err => {
				console.log(err);
				dispatch({
					type: UPDATE_CITY_ITEM_WEATHER_FAILED,
					payload: err.response.data
				});
			});
	};
};

// remove all cities from the list
export const clearAllCities = () => {
	return {
		type: CLEAR_ALL_CITIES
	};
};


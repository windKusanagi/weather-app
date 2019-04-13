import axios from "axios";
import { weatherApiKey } from "../../config/config";
import {
	ADD_CITY_DATA_FAILED,
	ADD_CITY_DATA_SUCCESS,
	REMOVE_CITY_FROM_LIST,
	CLEAR_ERROR_MSG,
	FETCHING_DEFAULT_WEATHER,
	FETCH_DEFAULT_WEATHER,
	STOP_FETCHING_DEFAULT,
	FETCH_FIVE_DAY_WEATHER,
	FETCH_ONE_DAY_FORECAST,
	FETCH_FIVE_DAY_WEATHER_FAILED,
	FETCH_ONE_DAY_FORECAST_FAILED,
	FETCH_ALL_WEATHER_DATA_FAILED,
	FETCH_ALL_WEATHER_DATA
} from "./index";

const cur_weather_api_base = "https://api.openweathermap.org/data/2.5/weather?";
const five_day_api_base =
	"https://api.openweathermap.org/data/2.5/forecast/daily?";
const one_day_api_base =
	"https://api.openweathermap.org/data/2.5/forecast/hourly?";

export const addCityIntoList = cityData => {
	return (dispatch, getState) => {
		const state = getState();
		let isExist = false;
		for (let el of state.weather.cityList) {
			if (el.id === cityData.id) isExist = true;
		}
		if (isExist) {
			dispatch({
				type: ADD_CITY_DATA_FAILED,
				payload: "City is alreay in the list"
			});
		} else {
			dispatch({
				type: ADD_CITY_DATA_SUCCESS,
				payload: cityData
			});
		}
	};
};

export const removeCityFromList = idx => {
	return {
		type: REMOVE_CITY_FROM_LIST,
		payload: idx
	};
};

export const clearErrMsg = () => {
	return {
		type: CLEAR_ERROR_MSG
	};
};

export const fetchDefaultWeather = latLon => {
	return dispatch => {
		dispatch({
			type: FETCHING_DEFAULT_WEATHER,
			payload: latLon
		});
		axios
			.get(
				`${cur_weather_api_base}lat=${latLon.lat}&lon=${
					latLon.lon
				}&appid=${weatherApiKey}`
			)
			.then(res => {
				return dispatch({
					type: FETCH_DEFAULT_WEATHER,
					payload: res.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	};
};

export const stopFetchingDefault = () => {
	return {
		type: STOP_FETCHING_DEFAULT
	};
};

// api.openweathermap.org/data/2.5/forecast/daily?lat=44.6497072&lon=-63.5705359&appid=c51223c219d6aec8cb8c5210449bd859&cnt=1
export const fetchFiveDayWeather = latLon => {
	return dispatch => {
		axios
			.get(
				`${five_day_api_base}lat=${latLon.lat}&lon=${
					latLon.lon
				}&appid=${weatherApiKey}&cnt=5`
			)
			.then(rsp => {
				dispatch({
					type: FETCH_FIVE_DAY_WEATHER,
					payload: rsp.data
				});
			})
			.catch(err => {
				dispatch({
					type: FETCH_FIVE_DAY_WEATHER_FAILED,
					payload: err.response.data
				});
			});
	};
};

export const fetchOneDayWeather = latLon => {
	return dispatch => {
		axios
			.get(
				`${one_day_api_base}lat=${latLon.lat}&lon=${
					latLon.lon
				}&appid=${weatherApiKey}&cnt=24`
			)
			.then(rsp => {
				dispatch({
					type: FETCH_ONE_DAY_FORECAST,
					payload: rsp.data
				});
			})
			.catch(err => {
				dispatch({
					type: FETCH_ONE_DAY_FORECAST_FAILED,
					payload: err.response.data
				});
			});
	};
};

export const fetchAllWeatherData = latLon => {
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
				console.log(vals);
				dispatch({
					type: FETCH_ALL_WEATHER_DATA,
					payload: {
						current: vals[0].data,
						oneDay: vals[1].data,
						fiveDay: vals[2].data
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

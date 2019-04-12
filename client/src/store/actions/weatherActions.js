import axios from "axios";
import { weatherApiKey } from "../../config/config";

const cur_weather_api_base = "https://api.openweathermap.org/data/2.5/weather?";
const five_day_api_base =
	"https://api.openweathermap.org/data/2.5/forecast/daily?";

export const ADD_CITY_DATA_SUCCESS = "ADD_CITY_DATA_SUCCESS";
export const ADD_CITY_DATA_FAILED = "ADD_CITY_DATA_FAILED";
export const CLEAR_ERROR_MSG = "CLEAR_ERROR_MSG";
export const REMOVE_CITY_FROM_LIST = "REMOVE_CITY_FROM_LIST";
export const FETCH_DEFAULT_WEATHER = "FETCH_DEFAULT_WEATHER";
export const FETCH_DEFAULT_WEATHER_FAILED = "FETCH_DEFAULT_WEATHER_FAILED";
export const FETCHING_DEFAULT_WEATHER = "FETCHING_DEFAULT_WEATHER";
export const STOP_FETCHING_DEFAULT = "STOP_FETCHING_DEFAULT";
export const FETCH_FIVE_DAY_WEATHER = "FETCH_FIVE_DAY_WEATHER";
export const FETCH_FIVE_DAY_WEATHER_FAILED = "FETCH_FIVE_DAY_WEATHER_FAILED";

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
		axios.get(
			`${five_day_api_base}lat=${latLon.lat}&lon=${
				latLon.lon
			}&appid=${weatherApiKey}&cnt=5`
		).then(rsp => {
			dispatch({
				type: FETCH_FIVE_DAY_WEATHER,
				payload: rsp.data
			})
		})
		.catch(err => {
			console.log(err);
		});

	};
};

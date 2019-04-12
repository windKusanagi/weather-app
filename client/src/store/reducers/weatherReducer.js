import {
	ADD_CITY_DATA_SUCCESS,
	ADD_CITY_DATA_FAILED,
	REMOVE_CITY_FROM_LIST,
	FETCH_DEFAULT_WEATHER,
	FETCHING_DEFAULT_WEATHER,
	STOP_FETCHING_DEFAULT,
	FETCH_FIVE_DAY_WEATHER,
	FETCH_FIVE_DAY_WEATHER_FAILED
} from "../actions/weatherActions";

const initialState = {
	currentWeather: {},
	cityList: [],
	errorMsg: null,
	currentGps: {},
	isLoadingDefaultGps: true,
	fiveDayWeathers: {}
};

const weatherReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CITY_DATA_SUCCESS:
			let newCityList = [...state.cityList, action.payload];
			return {
				...state,
				cityList: newCityList,
				errorMsg: null
			};
		case ADD_CITY_DATA_FAILED:
			return {
				...state,
				errorMsg: action.payload
			};
		case REMOVE_CITY_FROM_LIST:
			let cities = state.cityList.filter(el => el.id !== action.payload);
			return {
				...state,
				cityList: cities
			};
		case FETCHING_DEFAULT_WEATHER:
			return {
				...state,
				isLoadingDefaultGps: true,
				currentGps: action.payload
			};
		case STOP_FETCHING_DEFAULT:
			return {
				...state,
				isLoadingDefaultGps: false
			};
		case FETCH_DEFAULT_WEATHER:
			return {
				...state,
				isLoadingDefaultGps: false,
				currentWeather: action.payload
			};
		case FETCH_FIVE_DAY_WEATHER:
			return {
				...state,
				fiveDayWeathers: action.payload,
				errorMsg: null
			}
		case FETCH_FIVE_DAY_WEATHER_FAILED:
			return {
				...state,
				fiveDayWeathers: [],
				errorMsg: action.payload
			}
		default:
			return state;
	}
};

export default weatherReducer;

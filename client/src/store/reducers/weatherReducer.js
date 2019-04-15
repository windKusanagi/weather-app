import {
	ADD_CITY_DATA_SUCCESS,
	ADD_CITY_DATA_FAILED,
	UPDATE_CITY_ITEM_WEATHER,
	UPDATE_CITY_ITEM_WEATHER_FAILED,
	REMOVE_CITY_FROM_LIST,
	STOP_FETCHING_DEFAULT,
	FETCH_ALL_WEATHER_DATA,
	FETCH_ALL_WEATHER_DATA_FAILED,
	UPDATE_ERROR_MSG,
	RESET_ERROR_MSG,
	CLEAR_ALL_CITIES
} from "../actions/index";

// Initial state for weather reducer
const initialState = {
	currentWeather: {},
	cityList: [],
	errorMsg: "",
	currentGps: {},
	isLoading: true,
	fiveDayWeathers: [],
	oneDayForecast: [],
	isDefault: true,
	currentCityId: ""
};

const weatherReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CITY_DATA_SUCCESS:
			let newCityList;
			// make sure there are at most 8 cities in the list
			if (state.cityList.length < 8) {
				newCityList = [action.payload, ...state.cityList];
			} else {
				newCityList = [...state.cityList];
				newCityList.splice(newCityList.length - 1, 1);
				newCityList.unshift(action.payload);
			}
			return {
				...state,
				cityList: newCityList,
				errorMsg: "",
				currentCityId: action.payload.id,
				isLoading: true
			};
		case ADD_CITY_DATA_FAILED:
			return {
				...state,
				errorMsg: action.payload
			};
		case REMOVE_CITY_FROM_LIST:
			let cities = state.cityList.filter(el => el.id !== action.payload);
			if (state.currentCityId === action.payload) {
				return {
					...state,
					currentWeather: {},
					cityList: cities,
					errorMsg: "",
					currentGps: {},
					fiveDayWeathers: [],
					oneDayForecast: [],
					isDefault: false,
					currentCityId: ""
				};
			} else {
				return {
					...state,
					cityList: cities,
					isDefault: false
				};
			}
		case STOP_FETCHING_DEFAULT:
			return {
				...state,
				isLoading: false
			};
		case FETCH_ALL_WEATHER_DATA:
			const cityArr = [...state.cityList];
			if (state.cityList.length !== 0) {
				cityArr[0].currentTemp = action.payload.current.main.temp;
				return {
					...state,
					cityList: cityArr,
					currentWeather: action.payload.current,
					oneDayForecast: action.payload.oneDay.list,
					fiveDayWeathers: action.payload.fiveDay.list,
					currentCityId: action.payload.id,
					isLoading: false
				};
			} else {
				// case for the default weather based on your cuurent location
				return {
					...state,
					currentWeather: action.payload.current,
					oneDayForecast: action.payload.oneDay.list,
					fiveDayWeathers: action.payload.fiveDay.list,
					isLoading: false
				};
			}
		case FETCH_ALL_WEATHER_DATA_FAILED:
			return {
				...state,
				currentWeather: {},
				fiveDayWeathers: [],
				oneDayForecast: [],
				errorMsg: action.payload,
				isLoading: false
			};
		case UPDATE_CITY_ITEM_WEATHER:
			const cityList = [...state.cityList];
			cityList[action.payload.index].currentTemp =
				action.payload.data.main.temp;
			return {
				...state,
				cityList,
				errorMsg: ""
			};
		case UPDATE_CITY_ITEM_WEATHER_FAILED:
			return {
				...state,
				errorMsg: action.payload
			};
		case UPDATE_ERROR_MSG:
			return {
				...state,
				errorMsg: action.payload
			};
		case RESET_ERROR_MSG:
			return {
				...state,
				errorMsg: ""
			};
		case CLEAR_ALL_CITIES:
			return {
				...state,
				isDefault: false,
				currentWeather: {},
				cityList: [],
				errorMsg: "",
				currentGps: {},
				fiveDayWeathers: [],
				oneDayForecast: [],
				isLoading: false,
				currentCityId: ""
			};
		default:
			return state;
	}
};

export default weatherReducer;

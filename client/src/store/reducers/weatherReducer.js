import {
	ADD_CITY_DATA_SUCCESS,
	ADD_CITY_DATA_FAILED,
	REMOVE_CITY_FROM_LIST
} from "../actions/weatherActions";

const initialState = {
	currentWeather: [],
	cityList: [],
	errorMsg: null
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
			let cities = state.cityList.filter(
				el => el.id !== action.payload
			);
			return {
				...state,
				cityList: cities
			};
		default:
			return state;
	}
};

export default weatherReducer;

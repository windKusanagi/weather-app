import axios from "axios";

export const ADD_CITY_DATA_SUCCESS = "ADD_CITY_DATA_SUCCESS";
export const ADD_CITY_DATA_FAILED = "ADD_CITY_DATA_FAILED";
export const CLEAR_ERROR_MSG = "CLEAR_ERROR_MSG";
export const REMOVE_CITY_FROM_LIST = "REMOVE_CITY_FROM_LIST";

export const fetchFiveDayForecast = coordinate => {
	return dispatch => {
		// axios
		// .get(`${place_api_base_url}${searchStr}${place_api_params}`)
		// .then(rsp => {
		// 	console.log(rsp.data)
		// })
		// .catch(err => {
		// 	console.log("there is an err", err);
		// });
	};
};

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
	}
}

export const clearErrMsg = () => {
	return {
		type: CLEAR_ERROR_MSG
	};
};

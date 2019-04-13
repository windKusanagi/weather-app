import axios from "axios";
import {
	SIGN_IN_SUCCESS,
	SIGN_IN_FAILED,
	SIGN_UP_SUCCESS,
	SIGN_UP_FAILED,
	SIGN_OUT
} from './index';

const baseUrl = "https://us-central1-weather-app-c8787.cloudfunctions.net/app/";

export const signin = (formData, callback) => {
	return dispatch => {
		axios
			.post(`${baseUrl}signin`, formData)
			.then(rsp => {
				dispatch({
					type: SIGN_IN_SUCCESS,
					payload: rsp.data.token
				});
				localStorage.setItem("token", rsp.data.token);
				callback();
			})
			.catch(err => {
				console.log("there is an err", err);
				dispatch({
					type: SIGN_IN_FAILED,
					payload: "Sign in failed"
				});
			});
	};
};

export const signup = (formData, callback) => {
	return dispatch => {
		axios
			.post(`${baseUrl}signup`, formData)
			.then(rsp => {
				dispatch({
					type: SIGN_UP_SUCCESS,
					payload: rsp.data.token
				});
				localStorage.setItem("token", rsp.data.token);
				callback();
			})
			.catch(err => {
				dispatch({
					type: SIGN_UP_FAILED,
					payload: err.response.data.error
				});
			});
	};
};

export const signout = () => {
	localStorage.removeItem("token");
	return {
		type: SIGN_OUT
	};
};

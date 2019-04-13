import { SIGN_IN_SUCCESS, SIGN_IN_FAILED, SIGN_UP_SUCCESS, SIGN_UP_FAILED, SIGN_OUT } from "../actions/index";

const initialState = {
	token: null,
	errMsg: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN_SUCCESS:
			return {
				...state,
				token: action.payload,
				errMsg: null,
			};
		case SIGN_IN_FAILED:
			return {
				...state,
				token: null,
				errMsg: action.payload,
			};
		case SIGN_UP_SUCCESS:
			return {
				...state,
				token: action.payload,
				errMsg: null,
			};
		case SIGN_UP_FAILED:
			return {
				...state,
				token: null,
				errMsg: action.payload,
			};
		case SIGN_OUT:
			return {
				...state,
				token: null,
				errMsg: null,
			}
		default:
			return state;
	}
};

export default authReducer;

import { combineReducers } from "redux";
import authReduer from './authReducer';
import weatherReducer from "./weatherReducer";

const rootReducer = combineReducers({
	auth: authReduer,
	weather: weatherReducer
});

export default rootReducer;

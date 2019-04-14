import { combineReducers } from "redux";
import authReduer from './authReducer';
import weatherReducer from "./weatherReducer";
import userReducer from "./userReducer";


const rootReducer = combineReducers({
	auth: authReduer,
	weather: weatherReducer,
	user: userReducer
});

export default rootReducer;

import { combineReducers } from "redux";
import authReduer from './authReducer';

const rootReducer = combineReducers({
	auth: authReduer,
});

export default rootReducer;

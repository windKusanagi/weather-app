import { combineReducers } from "redux";
import authReduer from './authReducer';
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
	auth: authReduer,
	search: searchReducer
});

export default rootReducer;

// can be used in .test.js file to setup a basic redux env
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducers from "./store/reducers/rootReducer";
import thunk from "redux-thunk";

const Root = props => {
	const { children, initialState } = props;
	const store = createStore(
		rootReducers,
		initialState
			? initialState
			: {
					auth: {
						token: localStorage.getItem("token")
							? localStorage.getItem("token")
							: "",
						errMsg: ""
					}
			  },
		applyMiddleware(thunk)
	);
	return <Provider store={store}>{children}</Provider>;
};

export default Root;

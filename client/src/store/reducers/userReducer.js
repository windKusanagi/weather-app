import { OPEN_DRAWER, CLOSE_DRAWER } from "../actions/index";

// Initial state for user reducer
const initialState = {
	isDrawerOpen: false
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_DRAWER:
			return {
				...state,
				isDrawerOpen: true
			};
		case CLOSE_DRAWER:
			return {
				...state,
				isDrawerOpen: false
			};
		default:
			return state;
	}
};

export default userReducer;

import { OPEN_DRAWER, CLOSE_DRAWER } from ".";

// Open drawer in sm screen size
export const openDrawer = () => {
	return {
		type: OPEN_DRAWER
	};
};

// Close drawer in sm screen size
export const closeDrawer = () => {
	return {
		type: CLOSE_DRAWER
	};
};

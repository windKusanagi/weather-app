export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];

// The date time string returned by openweathermap api is in UTC time.
// need to convert it into local time.
export const covertToLocalTime = timeUTC => {
	var date = new Date(`${timeUTC} UTC`);
	return date;
};

// Get correct day, date, month with a day offset
export const getMonth = index => {
	let today = new Date();
	today.setDate(today.getDate() + index);
	return today.getMonth();
};

export const getDate = index => {
	let today = new Date();
	today.setDate(today.getDate() + index);
	return today.getDate();
};

export const getDay = index => {
	let today = new Date();
	today.setDate(today.getDate() + index);
	return today.getDay();
};

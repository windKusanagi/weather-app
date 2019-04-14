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


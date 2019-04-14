export const svgPathHelper = (main, description, hour = null) => {
	let hr = hour? hour : new Date().getHours();
	let dayTime = (hr <= 18 && hr>=6)? true : false;
	switch (main) {
		case "Clear":
			return hr <= 18 ? "images/day.svg" : "images/night.svg";
		case "Clouds":
			if (description === "few clouds") {
				return dayTime
					? "images/cloudy-day-1.svg"
					: "images/cloudy-night-1.svg";
			} else if (description === "scattered clouds") {
				return dayTime
					? "images/cloudy-day-2.svg"
					: "images/cloudy-night-2.svg";
			} else if (description === "broken clouds") {
				return dayTime
					? "images/cloudy-day-3.svg"
					: "images/cloudy-night-3.svg";
			} else {
				return "images/cloudy.svg";
			}
		case "Rain":
			if (description === "light rain") {
				return dayTime ? "images/rainy-1.svg" : "images/rainy-4.svg";
			} else if (description === "moderate rain") {
				return dayTime ? "images/rainy-2.svg" : "images/rainy-5.svg";
			} else if (description === "heavy intensity rain") {
				return dayTime ? "images/rainy-3.svg" : "images/rainy-6.svg";
			} else {
				return "images/rainy-7.svg";
			}
		case "Snow":
			if (description === "light snow") {
				return dayTime ? "images/snowy-1.svg" : "images/snowy-4.svg";
			} else if (description === "moderate rain") {
				return dayTime? "images/snowy-2.svg" : "images/snowy-5.svg";
			} else if (description === "heavy intensity rain") {
				return dayTime ? "images/snowy-3.svg" : "images/snowy-6.svg";
			} else {
				return "images/snowy-6.svg";
			}
		case "Drizzle":
			return dayTime? "images/rainy-1.svg" : "images/rainy-4.svg";
		case "Thunderstorm":
			return "images/thunder.svg";
		case "Smoke":
			return "images/cloudy.svg";
		case "Fog":
			return "images/cloudy.svg";
		case "Mist":
			return "images/cloudy.svg";
		default:
			break;
	}
};

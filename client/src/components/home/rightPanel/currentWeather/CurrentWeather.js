import React from "react";
import { connect } from "react-redux";
import CachedIcon from "@material-ui/icons/Cached";
import IconButton from "@material-ui/core/IconButton";
import "./CurrentWeather.scss";

const CurrentWeather = props => {
	const { currentWeather } = props;
	console.log(currentWeather);
	let mainSvgPath = "images/";
	let hr = new Date().getHours();

	switch (currentWeather.weather.main) {
		case "clear":
			if (hr <= 18) {
				mainSvgPath += "day.svg";
			} else {
				mainSvgPath += "night.svg";
			}
			break;
		case "clouds":
			if (hr <= 18) {
				mainSvgPath += "day.svg";
			} else {
				mainSvgPath += "night.svg";
			}
			break;
		default:
			if (hr <= 18) {
				mainSvgPath += "day.svg";
			} else {
				mainSvgPath += "night.svg";
			}
			break;
	}

	return (
		<div className="currentWeather">
			<div className="currentWeather__top">
				<p>{`${currentWeather.name}, ${currentWeather.sys.country}`}</p>
				<IconButton aria-label="Refresh">
					<CachedIcon />
				</IconButton>
			</div>
			<div className="currentWeather__mid">
				<div className="currentWeather__mid__left">
					<img src={mainSvgPath} alt="weather-img" />
				</div>
				<div className="currentWeather__mid__right">
					<p>
						<b>Temperature:</b>{" "}
						{`${(300 - currentWeather.main.temp).toFixed(2)} °C`}
					</p>
					<p>
						<b>Weather:</b>{" "}
						{`${currentWeather.weather[0].description}`}
					</p>
					<p>
						<b>Wind:</b>{" "}
						{`${currentWeather.wind.speed}ms ${
							currentWeather.wind.deg
						} deg`}
					</p>
					<p>
						<b>Humidity:</b> {`${currentWeather.main.humidity}`}
					</p>
					<p>
						<b>Pressure:</b> {`${currentWeather.main.pressure}`}
					</p>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		currentWeather: state.weather.currentWeather
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CurrentWeather);

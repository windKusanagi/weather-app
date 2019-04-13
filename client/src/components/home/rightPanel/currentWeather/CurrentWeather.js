import React from "react";
import { connect } from "react-redux";
import CachedIcon from "@material-ui/icons/Cached";
import IconButton from "@material-ui/core/IconButton";
import "./CurrentWeather.scss";
import { svgPathHelper } from "../../../../static/svgPathHelper";

const CurrentWeather = props => {
	const { currentWeather } = props;
	const svgPath = svgPathHelper(
		currentWeather.weather[0].main,
		currentWeather.weather[0].description
	);
	console.log(currentWeather);
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
					<img src={svgPath} alt="weather-img" />
				</div>
				<div className="currentWeather__mid__right">
					<p>
						<b>Temperature:</b>{" "}
						{`${(currentWeather.main.temp - 273.15).toFixed(1)} °C`}
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

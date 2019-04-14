import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CachedIcon from "@material-ui/icons/Cached";
import IconButton from "@material-ui/core/IconButton";
import "./CurrentWeather.scss";
import { svgPathHelper } from "../../../../static/svgPathHelper";
import { fetchAllWeatherData } from "../../../../store/actions/weatherActions";

const CurrentWeather = props => {
	const { currentWeather, currentId } = props;
	const svgPath = svgPathHelper(
		currentWeather.weather[0].main,
		currentWeather.weather[0].description
	);
	return (
		<div className="currentWeather">
			<div className="currentWeather__top">
				<p>{`${currentWeather.name}, ${currentWeather.sys.country}`}</p>
				<IconButton
					aria-label="Refresh"
					onClick={e => {
						e.preventDefault();
						props.fetchAllWeaher(currentWeather.coord, currentId);
					}}
				>
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

CurrentWeather.propTypes = {
	currentWeather: PropTypes.object.isRequired,
	currentId: PropTypes.string.isRequired,
	fetchAllWeaher: PropTypes.func
};

const mapStateToProps = state => {
	return {
		currentId: state.weather.currentCityId,
		currentWeather: state.weather.currentWeather
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchAllWeaher: (latLon, id) =>
			dispatch(fetchAllWeatherData(latLon, id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CurrentWeather);

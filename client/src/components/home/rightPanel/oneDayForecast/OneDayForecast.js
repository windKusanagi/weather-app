import React from "react";
import PropTypes from "prop-types";
import "./OneDayForecast.scss";
import { connect } from "react-redux";
import { svgPathHelper } from "../../../../static/svgPathHelper";
import { covertToLocalTime } from "../../../../static/days";

const OneDayForecast = props => {
	const { oneDayForecast } = props;
	return (
		<div className="oneDayForecast" id="one-day-forecast">
			{oneDayForecast.length !== 0 &&
				oneDayForecast.map((el, index) => {
					return (
						<div className="oneDayForecast__content" key={index}>
							<p>{covertToLocalTime(el.dt_txt).getHours()}</p>

							<img
								src={svgPathHelper(
									el.weather[0].main,
									el.weather[0].description,
									covertToLocalTime(el.dt_txt).getHours()
								)}
								alt="weather-img"
							/>
							<p>{`${(el.main.temp - 273.15).toFixed(0)} °C`}</p>
						</div>
					);
				})}
		</div>
	);
};

OneDayForecast.propTypes = {
	currentGps: PropTypes.object.isRequired,
	oneDayForecast: PropTypes.array.isRequired
};

const mapStateToProps = state => {
	return {
		currentGps: state.weather.currentGps,
		oneDayForecast: state.weather.oneDayForecast
	};
};

export default connect(mapStateToProps)(OneDayForecast);

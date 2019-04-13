import React, { Component } from "react";
import "./OneDayForecast.scss";
import { connect } from "react-redux";
import { fetchOneDayWeather } from "../../../../store/actions/weatherActions";
import { svgPathHelper } from "../../../../static/svgPathHelper";
import { covertToLocalTime } from "../../../../static/days";

class OneDayForecast extends Component {
	componentWillMount = () => {
		this.props.fetchOneDayForecast(this.props.currentGps);
	};

	render() {
		const { oneDayForecast } = this.props;
		console.log(oneDayForecast);
		return (
			<div className="oneDayForecast" id="one-day-forecast">
				{oneDayForecast !== [] &&
					oneDayForecast.map((el, index) => {
						return (
							<div
								className="oneDayForecast__content"
								key={index}
							>
								<p>{covertToLocalTime(el.dt_txt).getHours()}</p>

								<img
									src={svgPathHelper(
										el.weather[0].main,
										el.weather[0].description,
										covertToLocalTime(el.dt_txt).getHours()
									)}
									alt="weather-img"
								/>
								<p>{`${(el.main.temp_max - 273.15).toFixed(
									0
								)} °C`}</p>
							</div>
						);
					})}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		currentGps: state.weather.currentGps,
		oneDayForecast: state.weather.oneDayForecast
	};
};
const mapDispatchToProps = dispatch => {
	return {
		fetchOneDayForecast: latLon => dispatch(fetchOneDayWeather(latLon))
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OneDayForecast);

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFiveDayWeather } from "../../../../store/actions/weatherActions";
import "./FiveDayForecast.scss";

class FiveDayForecast extends Component {
	componentWillMount = () => {
		this.props.fetchFiveDayWeather(this.props.currentGps);
	};

	render() {
		const { fiveDayWeathers } = this.props;
		const today = new Date();
		const date = today.getDate();
		const day = today.getDay();
		return (
			<div className="fiveDayContainer">
				{fiveDayWeathers.list && fiveDayWeathers.list.map((el, index) => {
					return (
						<div key={index} className="fiveDayContainer__item">
							<p>{date + index}</p>
							<p>{day + index}</p>
							<img src="images/day.svg" alt="weather-img" />
							<p>{`${(300 - el.temp.day).toFixed(2)} °C`}</p>
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
		fiveDayWeathers: state.weather.fiveDayWeathers
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchFiveDayWeather: latLon => dispatch(fetchFiveDayWeather(latLon))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FiveDayForecast);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./FiveDayForecast.scss";
import { svgPathHelper } from "../../../../static/svgPathHelper";
import { months, weekDays } from "../../../../static/days";

class FiveDayForecast extends Component {
	getMonth = index => {
		let today = new Date();
		today.setDate(today.getDate() + index);
		return today.getMonth();
	};

	getDate = index => {
		let today = new Date();
		today.setDate(today.getDate() + index);
		return today.getDate();
	};

	getDay = index => {
		let today = new Date();
		today.setDate(today.getDate() + index);
		return today.getDay();
	};

	render() {
		const { fiveDayWeathers } = this.props;
		return (
			<div className="fiveDayContainer">
				{fiveDayWeathers.length !== 0 &&
					fiveDayWeathers.map((el, index) => {
						return (
							<div key={index} className="fiveDayContainer__item">
								<p>
									{index === 0
										? `Today`
										: `${
												months[this.getMonth(index)]
										  }. ${this.getDate(index)}`}
								</p>
								<p>{weekDays[this.getDay(index)]}</p>
								<img
									src={svgPathHelper(
										el.weather[0].main,
										el.weather[0].description,
										12 // show daytime icon
									)}
									alt="weather-img"
								/>
								<p>
									{`${(el.temp.min - 273.15).toFixed(1)} °C`}{" "}
									-{" "}
									{`${(el.temp.max - 273.15).toFixed(1)} °C`}{" "}
								</p>
							</div>
						);
					})}
			</div>
		);
	}
}

FiveDayForecast.propTypes = {
	currentGps: PropTypes.object.isRequired,
	fiveDayWeathers: PropTypes.array.isRequired
};

const mapStateToProps = state => {
	return {
		currentGps: state.weather.currentGps,
		fiveDayWeathers: state.weather.fiveDayWeathers
	};
};

export default connect(mapStateToProps)(FiveDayForecast);

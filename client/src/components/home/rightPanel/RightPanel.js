import React, { Component } from "react";
import { connect } from "react-redux";
import {
	fetchAllWeatherData,
	stopFetchingDefault,
	updateErrorMsg
} from "../../../store/actions/weatherActions";
import LoadingCircle from "../../widget/LoadingCircle";
import CurrentWeather from "./currentWeather/CurrentWeather";
import FiveDayForecast from "./fiveDayForecast/FiveDayForecast";
import OneDayForecast from "./oneDayForecast/OneDayForecast";
import Divider from "@material-ui/core/Divider";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import "./RightPanel.scss";
import isEmpty from "lodash/isEmpty";

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper
	},
	divider_1: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	},
	divider_2: {
		marginTop: theme.spacing.unit * 4,
		marginBottom: theme.spacing.unit
	}
});

class RightPanel extends Component {
	componentWillMount = () => {
		// Try to get your default GPS and fether the weather data
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					this.props.fetchAllWeatherData(
						{
							lat: position.coords.latitude,
							lon: position.coords.longitude
						},
						""
					);
				},
				err => {
					this.props.stopFetchingDefault();
				}
			);
		} else {
			this.props.updateErrorMsg(
				"Geolocation is not supported for this Browser/OS."
			);
		}
	};

	render() {
		const { isLoading, isDefault, classes, weather } = this.props;
		let renderCase;
		if (isLoading) {
			renderCase = 0; // When loading the weather data
		} else if (weather.currentCityId === "" && isDefault) {
			if (!isEmpty(weather.currentWeather)) {
				renderCase = 2; // Showing default weather report based on your current gps
			} else {
				renderCase = 1; // Showing empty when geolocation is not accessible
			}
		} else if (weather.currentCityId === "" && !isDefault) {
			renderCase = 1; // Showing empty when no city in the list
		} else {
			renderCase = 2;	// Showing the weather report view
		}

		return (
			<div>
				{renderCase === 0 && (
					<div className="rightPanel__loading-default">
						<LoadingCircle />
						<p>
							{isDefault
								? `Loading your current GPS and weather, please wait...`
								: `Fetching the data, please wait...`}
						</p>
					</div>
				)}
				{renderCase === 1 && (
					<div className="rightPanel__loading-default">
						<p>
							Please add or select a city to view the temperature
							forecast
						</p>
					</div>
				)}
				{renderCase === 2 && (
					<div className="rightPanel">
						<CurrentWeather />
						<Divider className={classes.divider_1} />
						<p>{`Temperature in the next 24 hours (converted to your local time):`}</p>
						<OneDayForecast />
						<Divider className={classes.divider_2} />
						<p>Temperature in the next 5 days:</p>
						<FiveDayForecast />
					</div>
				)}
			</div>
		);
	}
}

RightPanel.propTypes = {
	classes: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isDefault: PropTypes.bool.isRequired,
	weather: PropTypes.object.isRequired,
	fetchAllWeatherData: PropTypes.func,
	stopFetchingDefault: PropTypes.func,
	updateErrorMsg: PropTypes.func
};

const mapStateToProps = state => {
	return {
		isLoading: state.weather.isLoading,
		isDefault: state.weather.isDefault,
		weather: state.weather
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchAllWeatherData: (Latlon, id) =>
			dispatch(fetchAllWeatherData(Latlon, id)),
		stopFetchingDefault: () => dispatch(stopFetchingDefault()),
		updateErrorMsg: str => dispatch(updateErrorMsg(str))
	};
};

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(RightPanel);

import React, { Component } from "react";
import { connect } from "react-redux";
import {
	fetchDefaultWeather,
	stopFetchingDefault
} from "../../../store/actions/weatherActions";
import LoadingCircle from "../../widget/LoadingCircle";
import CurrentWeather from "./currentWeather/CurrentWeather";
import FiveDayForecast from "./fiveDayForecast/FiveDayForecast";

class RightPanel extends Component {
	state = {
		allowLocation: true,
		errMsg: null
	};

	componentWillMount = () => {
		if (navigator.geolocation) {
			console.log("Geolocation is supported!");
			this.setState({
				allowLocation: true,
				errMsg: null
			});
			navigator.geolocation.getCurrentPosition(
				position => {
					this.props.fetchDefaultWeather({
						lat: position.coords.latitude,
						lon: position.coords.longitude
					});
				},
				err => {
					this.props.stopFetchingDefault();
				}
			);
		} else {
			console.log("Geolocation is not supported for this Browser/OS.");
			this.setState({
				allowLocation: false,
				errMsg: "Geolocation is not supported for this Browser/OS."
			});
		}
	};

	render() {
		const { isLoadingDefault } = this.props;
		return (
			<div>
				{isLoadingDefault ? (
					<div className="right__loading-default">
						<LoadingCircle />
						<p>
							Loading your current GPS and weather, please wait...
						</p>
					</div>
				) : (
					<div>
						<CurrentWeather />
						<FiveDayForecast />
					</div>
				)}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		isLoadingDefault: state.weather.isLoadingDefaultGps,
		currentWeather: state.weather.currentWeather
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchDefaultWeather: Latlon => dispatch(fetchDefaultWeather(Latlon)),
		stopFetchingDefault: () => dispatch(stopFetchingDefault())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RightPanel);

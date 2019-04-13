import React, { Component } from "react";
import { connect } from "react-redux";
import {
	fetchDefaultWeather,
	stopFetchingDefault
} from "../../../store/actions/weatherActions";
import LoadingCircle from "../../widget/LoadingCircle";
import CurrentWeather from "./currentWeather/CurrentWeather";
import FiveDayForecast from "./fiveDayForecast/FiveDayForecast";
import OneDayForecast from "./oneDayForecast/OneDayForecast";
import Divider from "@material-ui/core/Divider";
import { compose } from 'redux';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper
	},
	divider_1: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	},
	divider_2: {
		marginTop: theme.spacing.unit*4,
		marginBottom: theme.spacing.unit
	}
});

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
		const { isLoadingDefault, classes } = this.props;
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
						<Divider className={classes.divider_1}/>
						<p>{`Temperature in the next 24 hours (converted to your local time):`}</p>
						<OneDayForecast />
						<Divider className={classes.divider_2}/>
						<p>Temperature in the next 5 days:</p>
						<FiveDayForecast />
					</div>
				)}
			</div>
		);
	}
}

RightPanel.propTypes = {
	classes: PropTypes.object.isRequired
};

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

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(RightPanel);
import React from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import CachedIcon from "@material-ui/icons/Cached";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import "./CityList.scss";
import {
	removeCityFromList,
	fetchAllWeatherData,
	updateCityItemWeather,
	clearAllCities
} from "../../../../store/actions/weatherActions";
import { svgPathHelper } from "../../../../static/svgPathHelper";

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper
	},
	title: {
		margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
	},
	deleteBtn: {
		marginRight: "-15px"
	},
	button: {
		float: "right"
	},
	actions: {
		width: "auto !important",
		overflow: "unset !important"
	},
	icon: {
		width: "30px",
		height: "30px",
		marginRight: "0px"
	}
});

const CityList = props => {
	const { classes, cityList } = props;

	return (
		<div className={classes.root}>
			<List component="nav" dense={false} className="cityList">
				{cityList.length === 0 && (
					<div className="cityList__empty">
						Emtpy list, try adding new cities.
					</div>
				)}
				{cityList.length !== 0 &&
					cityList.map((el, index) => {
						return (
							<div key={index}>
								<ListItem
									button
									className="cityList__item"
									onClick={e => {
										e.stopPropagation();
										props.fetchAllWeatherData(
											cityList[index].latLon,
											el.id
										);
									}}
								>
									<ListItemIcon className={classes.icon}>
										{el.mainWeather && el.weatherDesc ? (
											<img
												src={svgPathHelper(
													el.mainWeather,
													el.weatherDesc,
													new Date().getHours()
												)}
												className="cityList__item__icon"
												alt=""
											/>
										) : (
											<div />
										)}
									</ListItemIcon>

									<ListItemText
										primary={
											el.currentTemp
												? `${el.name} - ${(
														el.currentTemp - 273.15
												  ).toFixed(1)} °C`
												: `${el.name}`
										}
									/>
									<ListItemSecondaryAction
										className={classes.actions}
									>
										<IconButton
											aria-label="Refresh"
											onClick={e => {
												e.stopPropagation();
												props.updateCityItemWeather(
													index
												);
											}}
										>
											<CachedIcon fontSize="small" />
										</IconButton>
										<IconButton
											aria-label="Delete"
											onClick={() => {
												props.removeCity(el.id);
											}}
											className={classes.deleteBtn}
										>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
								<Divider />
							</div>
						);
					})}
			</List>
			{cityList.length > 0 && (
				<Button
					variant="contained"
					color="secondary"
					className={classes.button}
					onClick={props.clearAllCities}
				>
					Clear All
				</Button>
			)}
		</div>
	);
};

CityList.propTypes = {
	classes: PropTypes.object.isRequired,
	cityList: PropTypes.array.isRequired,
	removeCity: PropTypes.func,
	fetchAllWeatherData: PropTypes.func,
	updateCityItemWeather: PropTypes.func
};

const mapStateToProps = state => {
	return {
		cityList: state.weather.cityList
	};
};

const mapDispatchToProps = dispatch => {
	return {
		removeCity: id => dispatch(removeCityFromList(id)),
		fetchAllWeatherData: (latLon, id) =>
			dispatch(fetchAllWeatherData(latLon, id)),
		updateCityItemWeather: index => dispatch(updateCityItemWeather(index)),
		clearAllCities: () => dispatch(clearAllCities())
	};
};

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(CityList);

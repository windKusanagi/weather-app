import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import DeleteIcon from "@material-ui/icons/Delete";
import CachedIcon from "@material-ui/icons/Cached";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import "./CityList.scss";
import { removeCityFromList } from "../../../../store/actions/weatherActions";

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper
	},
	title: {
		margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
	}
});

const CityList = props => {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<List dense={false}>
				{props.weather.cityList.length === 0 && (
					<div className="cityList__empty">
						Emtpy list, try adding new cities.
					</div>
				)}
				{props.weather.cityList.length !== 0 &&
					props.weather.cityList.map(el => {
						return (
							<div key={el.id}>
								<ListItem className="cityList__item">
									<ListItemAvatar className="cityList__avatar">
										<Avatar>
											<LocationCityIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={el.name} />
									<ListItemSecondaryAction>
										<IconButton aria-label="Refresh">
											<CachedIcon />
										</IconButton>
										<IconButton
											aria-label="Delete"
											onClick={() => {
												props.removeCity(el.id);
											}}
										>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
								<Divider />
							</div>
						);
					})}
			</List>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		weather: state.weather
	};
};

const mapDispatchToProps = dispatch => {
	return {
		removeCity: index => dispatch(removeCityFromList(index))
	};
};

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(CityList);

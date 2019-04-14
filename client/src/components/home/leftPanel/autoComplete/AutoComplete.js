import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {
	addCityIntoList,
	fetchAllWeatherData,
	updateErrorMsg,
} from "../../../../store/actions/weatherActions";
import isEmpty from 'lodash/isEmpty';

const styles = theme => ({
	root: {
		flexGrow: 1,
		alignSelf: "center"
	},
	container: {
		flexGrow: 1,
		position: "relative"
	},
	margin: {
		margin: theme.spacing.unit
	},
	paper: {
		position: "absolute",
		zIndex: 1,
		marginTop: theme.spacing.unit
	},
	inputRoot: {
		width: "80%",
		flexWrap: "wrap"
	},
	inputInput: {
		width: "100%",
		flexGrow: 1,
		alignSelf: "center",
		marginTop: "15px"
	}
});

class AutoComplete extends React.Component {
	state = {
		address: "",
		currentGps: {},
		currentPlaceId: ""
	};

	handleChange = address => {
		this.setState({ address });
	};

	handleSelect = address => {
		this.setState({
			address
		});
		geocodeByAddress(address)
			.then(results => {
				this.setState({
					currentPlaceId: results[0].place_id
				});
				return getLatLng(results[0]);
			})
			.then(latLng => {
				this.setState({
					currentGps: {
						lat: latLng.lat,
						lon: latLng.lng
					}
				});
			})
			.catch(error => {
				this.props.updateErrorMsg("Invalid City Input!")
			});
	};

	handleAdd = () => {
		this.props.addCityIntoList({
			id: this.state.currentPlaceId,
			name: `${this.state.address.split(",")[0]} (${this.state.address
				.split(",")
				.slice(-1)[0]
				.trim()})`,
			latLon: this.state.currentGps
		});
		this.setState({
			address: "",
			currentGps: {},
			currentPlaceId: ""
		});
		this.props.fetchAllWeatherData(this.state.currentGps, this.state.currentPlaceId);
	};

	render() {
		const { classes } = this.props;
		return (
			<div className="left__search">
				<PlacesAutocomplete
					value={this.state.address}
					onChange={this.handleChange}
					onSelect={this.handleSelect}
				>
					{({
						getInputProps,
						suggestions,
						getSuggestionItemProps,
						loading
					}) => (
						<div className={classes.inputRoot}>
							<TextField
								id="google-place-autocomplete"
								{...getInputProps({
									placeholder: "Type City Name Here"
								})}
								className={classes.inputInput}
							/>

							<div className="autocomplete-dropdown-container">
								<Paper className={classes.paper} square>
									{loading && <MenuItem>loading...</MenuItem>}
									{suggestions.map(suggestion => {
										const className = suggestion.active
											? "suggestion-item--active"
											: "suggestion-item";
										const style = suggestion.active
											? {
													backgroundColor: "#fafafa",
													cursor: "pointer",
													fontWeight: "500"
											  }
											: {
													backgroundColor: "#ffffff",
													cursor: "pointer",
													fontWeight: "400"
											  };
										return (
											<MenuItem
												{...getSuggestionItemProps(
													suggestion,
													{
														className,
														style
													}
												)}
											>
												{suggestion.description}
											</MenuItem>
										);
									})}
								</Paper>
							</div>
						</div>
					)}
				</PlacesAutocomplete>
				<Fab
					color="primary"
					aria-label="Add"
					size="small"
					className={classes.margin}
					onClick={this.handleAdd}
					disabled={isEmpty(this.state.currentGps)? true : false}
				>
					<AddIcon />
				</Fab>
			</div>
		);
	}
}

AutoComplete.propTypes = {
	classes: PropTypes.object.isRequired,
	cityList: PropTypes.array.isRequired,
	addCityIntoList: PropTypes.func,
	fetchAllWeatherData: PropTypes.func,
	updateErrorMsg: PropTypes.func,
};

const mapStateToProps = state => {
	return {
		cityList: state.weather.cityList
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addCityIntoList: cityData => dispatch(addCityIntoList(cityData)),
		fetchAllWeatherData: (latLon, id) => dispatch(fetchAllWeatherData(latLon, id)),
		updateErrorMsg: str => dispatch(updateErrorMsg(str)) 
	};
};
export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(AutoComplete);

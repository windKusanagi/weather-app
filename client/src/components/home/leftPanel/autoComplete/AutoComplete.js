import PlacesAutocomplete from "react-places-autocomplete";
import {
	geocodeByAddress,
	// geocodeByPlaceId,
	getLatLng
} from "react-places-autocomplete";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { compose } from "redux";
import { connect } from "react-redux";

const styles = theme => ({
	root: {
		flexGrow: 1,
		alignSelf: "center"
	},
	container: {
		flexGrow: 1,
		position: "relative"
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
	constructor(props) {
		super(props);
		this.state = { address: "" };
	}

	handleChange = address => {
		this.setState({ address });
	};

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => console.log("Success", latLng))
			.catch(error => console.error("Error", error));
	};

	render() {
		const { classes } = this.props;
		return (
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
								placeholder: "Search Places ..."
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
									// inline style for demonstration purpose
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
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {};
};
export default compose(
	withStyles(styles),
	connect(
		null,
		mapDispatchToProps
	)
)(AutoComplete);

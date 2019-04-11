import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import "./LeftPanel.scss";
import AutoComplete from "./autoComplete/AutoComplete";
import CityList from "./cityList/CityList";

const styles = theme => ({
	autoComplete: {
		marginTop: 0,
		width: "calc(90% - 40px)"
	},
	margin: {
		margin: theme.spacing.unit
	},
	divider_1: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
		marginLeft: "-6px",
		marginRight: "-6px",
		height: 2,
		backgroundColor: "black"
	},
	divider_2: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
		marginLeft: "-2px",
		marginRight: "-4px",
		height: 2,
		backgroundColor: "grey"
	}
});

const LeftPanel = props => {
	const { classes } = props;
	return (
		<div>
			<AutoComplete className={classes.autoComplete} />
			<Divider className={classes.divider_1} />
			<div className="left__list">
				<p className="left__list__title">Recent Locations</p>
				<Divider className={classes.divider_2} />
				<CityList />
			</div>
		</div>
	);
};

LeftPanel.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeftPanel);

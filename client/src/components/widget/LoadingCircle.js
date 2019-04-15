import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
	progress: {
		marginTop: theme.spacing.unit * 2,
		alignSelf: "center"
	}
});

// Loading icon in Google material design style
const LoadingCircle = props => {
	const { classes } = props;
	return <CircularProgress className={classes.progress} color="secondary" />;
};

LoadingCircle.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoadingCircle);

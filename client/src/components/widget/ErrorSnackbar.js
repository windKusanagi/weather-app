import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { compose } from "redux";
import { resetErrorMsg } from "../../store/actions/weatherActions";

const styles = theme => ({
	close: {
		padding: theme.spacing.unit / 2
	}
});

// A snackbar appears in the mid top screen to show error message
const ErrorSnackbar = props => {
	const { classes, errMsg } = props;
	return (
		<Snackbar
			anchorOrigin={{
				vertical: "top",
				horizontal: "center"
			}}
			open={props.errMsg !== ""}
			autoHideDuration={6000}
			onClose={props.resetErrorMsg}
			ContentProps={{
				"aria-describedby": "message-id"
			}}
			message={<span id="message-id">{errMsg}</span>}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="secondary"
					className={classes.close}
					onClick={props.resetErrorMsg}
				>
					<CloseIcon />
				</IconButton>
			]}
		/>
	);
};

ErrorSnackbar.propTypes = {
	classes: PropTypes.object.isRequired,
	errMsg: PropTypes.string.isRequired,
	resetErrorMsg: PropTypes.func
};

const mapStateToProps = state => {
	return {
		errMsg: state.weather.errorMsg
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetErrorMsg: () => dispatch(resetErrorMsg())
	};
};

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(ErrorSnackbar);

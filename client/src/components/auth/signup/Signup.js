import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import SignupForm from "./SignupForm";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 4,
		paddingBottom: theme.spacing.unit * 4
	},
	icon: {
		marginRight: theme.spacing.unit
	}
});

class Signup extends Component {
	onSignupSuccess = () => {
		this.props.history.push('/');
	}
	render() {
		const { classes } = this.props;
		return (
			<div className="auth">
				<div className="auth__title">
					<p>Weather Forcast SPA</p>
				</div>
				<Paper
					className={classNames(classes.root, "auth__paper")}
					elevation={5}
				>
					<div className="auth__paper__header">
						<AccountCircleOutlined className={classes.icon} />
						<p> Sign Up </p>
					</div>
					<SignupForm onSignupSuccess={this.onSignupSuccess}/>
				</Paper>
			</div>
		);
	}
}

Signup.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);

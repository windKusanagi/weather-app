import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./Auth.scss";
import classNames from "classnames";
import SigninForm from "./SigninForm";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import { connect } from "react-redux";

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

class Signin extends Component {

	onSigninSuccess = () => {
		this.props.history.push("/");
	};

	componentWillMount = () => {
		console.log(this.props.token);
		if (this.props.token !== "") {
			this.props.history.push("/");
		}
	};

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
						<p>Login </p>
					</div>
					<SigninForm onSigninSuccess={this.onSigninSuccess} />
				</Paper>
			</div>
		);
	}
}

Signin.propTypes = {
	classes: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired
};

const mapStateToProps = state => {
	return {
		token: state.auth.token
	};
};
export default connect(mapStateToProps)(withStyles(styles)(Signin));

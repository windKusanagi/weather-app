import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import blue from "@material-ui/core/colors/blue";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../../store/actions/authActions";

const styles = theme => ({
	input: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2
	},
	button: {
		marginTop: theme.spacing.unit * 4,
		marginBottom: theme.spacing.unit * 2,
		color: theme.palette.getContrastText(blue[500]),
		backgroundColor: blue[500],
		"&:hover": {
			backgroundColor: blue[700]
		},
		width: "80%",
		maxWidth: "200px",
		alignSelf: "center"
	}
});

class SignupForm extends Component {
	state = {
		email: "",
		password: "",
		passwordRe: "",
		weightRange: "",
		showPassword_1: false,
		showPassword_2: false
	};

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = index => {
		if (index === 1) {
			this.setState(state => ({ showPassword_1: !state.showPassword_1 }));
		} else {
			this.setState(state => ({ showPassword_2: !state.showPassword_2 }));
		}
	};

	handleSignup = () => {
		this.props.signup(
			{
				email: this.state.email,
				password: this.state.password
			},
			this.props.onSignupSuccess
		);
	};

	render() {
		const { classes, auth } = this.props;

		return (
			<div className="auth-form">
				<TextField
					id="auth-email"
					className={classNames(classes.input)}
					variant="outlined"
					label="Email"
					value={this.state.email}
					onChange={this.handleChange("email")}
				/>

				<TextField
					id="auth-password"
					className={classNames(classes.input)}
					variant="outlined"
					type={this.state.showPassword_1 ? "text" : "password"}
					label="Password"
					value={this.state.password}
					onChange={this.handleChange("password")}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle password visibility"
									onClick={() => {
										this.handleClickShowPassword(1);
									}}
								>
									{this.state.showPassword_1 ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>

				<TextField
					id="auth-password-confirm"
					className={classNames(classes.input)}
					variant="outlined"
					type={this.state.showPassword_2 ? "text" : "password"}
					label="Repeat the Password"
					value={this.state.passwordRe}
					onChange={this.handleChange("passwordRe")}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle password visibility"
									onClick={() => {
										this.handleClickShowPassword(2);
									}}
								>
									{this.state.showPassword_2 ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>

				<div className="auth-form__hint">
					<p>
						{`Already have an account? `}
						<Link to="/signin">Login</Link> here
					</p>
				</div>

				{auth.errMsg && (
					<div className="auth-form__error">
						<p>{`Error: ${auth.errMsg}`}</p>
					</div>
				)}

				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={this.handleSignup}
				>
					Sign Up
				</Button>
			</div>
		);
	}
}

SignupForm.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signup: (formData, callback) => {
			dispatch(signup(formData, callback));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(SignupForm));

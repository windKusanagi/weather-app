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
import debounce from "lodash/debounce";
import validator from "validator";

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
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			passwordRe: "",
			showPassword: false,
			isEmailValid: true,
			isPassValid: true,
			showPassword_1: false,
			showPassword_2: false,
			isPassConfirmed: true
		};
		this.delayedCheckEmail = debounce(this.checkEmail, 800);
		this.delayedCheckPass = debounce(this.checkPassword, 800);
		this.delayedPassConfrim = debounce(this.confirmPassword, 800);
	}
	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
		if (prop === "email") this.delayedCheckEmail();
		if (prop === "password") this.delayedCheckPass();
		if (prop === "passwordRe") this.delayedPassConfrim();
	};

	handleClickShowPassword = index => {
		if (index === 1) {
			this.setState(state => ({ showPassword_1: !state.showPassword_1 }));
		} else {
			this.setState(state => ({ showPassword_2: !state.showPassword_2 }));
		}
	};

	checkEmail = () => {
		this.setState({
			isEmailValid: validator.isEmail(this.state.email)
		});
	};

	checkPassword = () => {
		this.setState({
			isPassValid: this.state.password.length >= 8 ? true : false
		});
	};

	confirmPassword = () => {
		this.setState({
			isPassConfirmed:
				this.state.password === this.state.passwordRe ? true : false
		});
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
				{!this.state.isEmailValid && (
					<p className="auth-form__errMsg">
						Please input a valid email
					</p>
				)}
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
				{!this.state.isPassValid && (
					<p className="auth-form__errMsg">
						Password should be at least 8 characters
					</p>
				)}
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

				{!this.state.isPassConfirmed && (
					<p className="auth-form__errMsg">
						Passwords does not match!
					</p>
				)}

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
					disabled={
						!this.state.isEmailValid ||
						!this.state.isPassValid ||
						!this.state.isPassConfirmed ||
						this.state.email === "" ||
						this.state.password === "" ||
						this.state.passwordRe === ""
							? true
							: false
					}
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

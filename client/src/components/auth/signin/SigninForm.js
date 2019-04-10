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
import { signin } from "../../../store/actions/authActions";

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
		alignSelf: "center",
		maxWidth: "200px"
	}
});

class SigninForm extends Component {
	state = {
		email: "",
		password: "",
		showPassword: false
	};

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	handleSignin = () => {
		this.props.signin(
			{
				email: this.state.email,
				password: this.state.password
			},
			this.props.onSigninSuccess
		);
	};

	render() {
		const { classes } = this.props;
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
					type={this.state.showPassword ? "text" : "password"}
					label="Password"
					value={this.state.password}
					onChange={this.handleChange("password")}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle password visibility"
									onClick={this.handleClickShowPassword}
								>
									{this.state.showPassword ? (
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
						{`Doesn't have an account? `}
						<Link to="/signup">Regisiter</Link> here
					</p>
				</div>

				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={this.handleSignin}
				>
					Sign In
				</Button>
			</div>
		);
	}
}

SigninForm.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};
const mapDispatchToProps = dispatch => {
	return {
		signin: (formData, callback) => dispatch(signin(formData, callback))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(SigninForm));

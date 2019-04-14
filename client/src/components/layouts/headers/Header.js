import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import blue from "@material-ui/core/colors/blue";
import { connect } from "react-redux";
import { signout } from "../../../store/actions/authActions";
import classNames from "classnames";
import "./Header.scss";
import { openDrawer } from "../../../store/actions/userActions";


const styles = theme => ({
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	colorVar: {
		color: theme.palette.getContrastText(blue[500]),
		backgroundColor: blue[500]
	}
});

const Header = props => {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.colorVar}>
				<Toolbar>
					<IconButton
						className={classNames(classes.menuButton, "header-menu")}
						color="inherit"
						aria-label="Menu"
						onClick={props.openDrawer}
					>
						<MenuIcon/>
					</IconButton>
					<Typography
						variant="h6"
						color="inherit"
						className={classes.grow}
					>
						Weather Report SPA
					</Typography>
					<Button color="inherit" onClick={props.signout}>Logout</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	signout: PropTypes.func,
	signin: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
	return {
		signout: () => dispatch(signout()),
		openDrawer: () => dispatch(openDrawer())
	};
};
export default connect(
	null,
	mapDispatchToProps
)(withStyles(styles)(Header));

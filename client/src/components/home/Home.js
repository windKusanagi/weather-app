import React, { Component } from "react";
import "./Home.scss";
import { connect } from "react-redux";
import Header from "../layouts/headers/Header";
import requireAuth from "../hoc/requireAuth";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import LeftPanel from "./leftPanel/LeftPanel";
import RightPanel from "./rightPanel/RightPanel";
import Drawer from "@material-ui/core/Drawer";
import PropTypes from "prop-types";
import { closeDrawer } from "../../store/actions/userActions";
import ErrorSnackbar from "../widget/ErrorSnackbar";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: "center",
		color: theme.palette.text.secondary
	}
});

class Home extends Component {
	state = {
		smScreen: false
	};
	
	componentDidMount = () => {
		window.addEventListener("resize", this.resize);
		this.resize();
	}

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.resize);
	}

	resize = () => {
		this.setState({
			smScreen: window.innerWidth <= 960 ? true : false
		});
	};

	render() {
		const { classes, isDrawerOpen } = this.props;
		return (
			<div>
				<Header />
				<div className="home">
					<Grid justify="space-around" container>
						{this.state.smScreen ? (
							<Drawer
								open={isDrawerOpen}
								onClose={this.props.closeDrawer}
								className="home__left-drawer"
							>
								<Paper elevation={0}>
									<LeftPanel />
								</Paper>
							</Drawer>
						) : (
							<Grid item xs={4} className="home__left-desktop">
								<Paper className={classes.paper}>
									<LeftPanel />
								</Paper>
							</Grid>
						)}

						<Grid item xs={12} md={7} className="home__right">
							<Paper className={classes.paper}>
								<RightPanel />
							</Paper>
						</Grid>
					</Grid>
					<ErrorSnackbar/>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	isDrawerOpen: PropTypes.bool.isRequired,
	closeDrawer: PropTypes.func,
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		isDrawerOpen: state.user.isDrawerOpen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeDrawer: () => dispatch(closeDrawer())
	};
};
export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(requireAuth(Home));

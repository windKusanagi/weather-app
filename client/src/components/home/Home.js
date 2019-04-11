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
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Header />
				<div className="home">
					<Grid justify="space-around" container>
						<Grid item xs={4} className="home__left-desktop">
							<Paper className={classes.paper}>
								<LeftPanel/>
							</Paper>
						</Grid>
						<Grid item xs={12} sm={7} className="home__right">
							<Paper className={classes.paper}>
								<RightPanel/>
							</Paper>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};
export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(requireAuth(Home));

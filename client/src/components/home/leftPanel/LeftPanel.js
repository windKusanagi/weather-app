import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
// import IconButton from '@material-ui/core/IconButton';
import AddIcon from "@material-ui/icons/Add";
import "./LeftPanel.scss";
import AutoComplete from "./autoComplete/AutoComplete";

const styles = theme => ({
	autoComplete: {
		marginTop: 0,
		width: "calc(90% - 40px)"
	},
	margin: {
		margin: theme.spacing.unit
	},
	divider: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
		marginLeft: "-10px",
		marginRight: "-10px",
		height: 2,
		backgroundColor: "black"
	}
});

class LeftPanel extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className="left__search">
					<AutoComplete className={classes.autoComplete} />
					<Fab
						color="primary"
						aria-label="Add"
						size="small"
						className={classes.margin}
					>
						<AddIcon />
					</Fab>
				</div>
				<Divider className={classes.divider} />
			</div>
		);
	}
}

LeftPanel.propTypes = {
	classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(LeftPanel);

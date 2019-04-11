import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
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
		marginLeft: "-6px",
		marginRight: "-6px",
		height: 2,
		backgroundColor: "black"
	}
});

const LeftPanel = props => {

		const { classes } = props;
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

LeftPanel.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeftPanel);

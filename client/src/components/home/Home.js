import React, { Component } from "react";
import "./Home.scss";
import { connect } from "react-redux";
import Header from "../layouts/headers/Header";
import requireAuth from "../hoc/requireAuth";

class Home extends Component {
	render() {
		return (
			<div>
				<Header />
				Home
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};
export default connect(mapStateToProps)(requireAuth(Home));

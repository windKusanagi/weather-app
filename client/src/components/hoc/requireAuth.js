import React, { Component } from "react";
import { connect } from 'react-redux';

// Simple HOC to prevent acess from unauthenicated users
const requireAuth = ChildComponet => {
	class ComposedComponent extends Component {
		componentDidMount = () => {
			this.checkToken();
		}

		componentDidUpdate = () => {
			this.checkToken();
		}

		checkToken = () => {
			if(!this.props.token){
				this.props.history.push('/signin');
			}
		}
		
		render(){
			return <ChildComponet {...this.props} />;
		}
	}

	const mapStateToProps = state => {
		return {
			token: state.auth.token
		}
	}

	return connect(mapStateToProps)(ComposedComponent);
};



export default requireAuth;

import React, { Component } from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./components/home/Home";
import Signin from "./components/auth/signin/Signin";
import Signup from "./components/auth/signup/Signup";
import './App.css';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/signin"  component={Signin} />
						<Route path="/signup"  component={Signup} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;

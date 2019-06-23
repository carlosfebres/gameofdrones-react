import React, {Component} from 'react';
import './App.css';
import IntroScreen from '../intro/intro'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from "../home/home";

export default class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route path="/home" component={HomeScreen} />
					<div className="App-Container">
						<Route path="/" exact component={IntroScreen} />
					</div>
				</div>
			</Router>
		);
	}
}
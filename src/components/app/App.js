import React, {Component} from 'reactn';
import './App.css';
import IntroScreen from '../intro/intro'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from "../home/home";
import socketIOClient from "socket.io-client";

export default class App extends Component {

	componentDidMount() {
		this.setupSocket();
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Route path="/home" component={HomeScreen}/>
					<Route path="/" exact component={IntroScreen}/>
				</div>
			</Router>
		);
	}

	setupSocket() {
		const socketServerAddress = "localhost:2999";
		const socket = socketIOClient(socketServerAddress, {transports: ['websocket']});
		this.setGlobal({socket});

		socket.on("configure", configuration => {
			console.log("Configuration", configuration);
			this.setGlobal({moves: configuration.moves})
		});
	}
}
import React, {Component} from 'react';
import logo from '../../assets/images/logo.png';
import './home.css';

export default class HomeScreen extends Component {
	render() {
		return (
			<img className="logo" src={logo} alt="Logo"/>
		);
	}
}
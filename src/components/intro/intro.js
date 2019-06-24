import React, {Component} from 'reactn';
import logo from "../../assets/images/logo.png";
import './intro.css';
import FloatingBox from "../floating-box/floating-box";

export default class Intro extends Component {

	constructor(props) {
		super(props);
		this.state = {nickname: ''};

		this.handleChange = this.handleChange.bind(this);
		this.startPlaying = this.startPlaying.bind(this);
	}

	handleChange(event) {
		this.setState({nickname: event.target.value});
	}

	startPlaying(event) {
		alert(this.state.nickname);
		this.setGlobal({nickname: this.state.nickname});
		this.props.history.push('home');
		event.preventDefault();
	}

	render() {
		return (
			<div className="intro-container">
				<FloatingBox vertical="center" horizontal="center">
					<img className="logo" src={logo} alt="Logo"/>
					<hr/>
					<form onSubmit={this.startPlaying}>
						<input type="text" placeholder="Nickname" value={this.state.nickname}
							   onChange={this.handleChange}/>
						<input type="submit" value="Play!"/>
					</form>
				</FloatingBox>
			</div>
		);
	}
}
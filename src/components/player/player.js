import React, {Component} from 'reactn';
import './player.css'
import {Link} from "react-router-dom";

export default class Player extends Component {

	render() {
		return (
			<Link className="player-button" to={"playing/"+this.props.player.nickname}>{this.props.player.nickname}</Link>
		);
	}

}
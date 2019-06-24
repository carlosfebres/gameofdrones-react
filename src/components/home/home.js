import React, {Component} from 'reactn';
import logo from '../../assets/images/logo.png';
import './home.css';
import FloatingBox from "../floating-box/floating-box";
import Player from "../player/player";

export default class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			onlinePlayers: []
		};
	}

	componentDidMount() {
		this.global.socket.on("onlinePlayers", users => {
			this.setState({onlinePlayers: users});
		});
		this.global.socket.emit("getOnlinePlayers");
	}

	playerSelected(player) {
		console.log(player);
	}

	render() {
		return (
			<FloatingBox vertical="center" horizontal="center">
				<img className="logo" src={logo} alt="Logo"/>
				<h2>Game Of Drones</h2>
				{
					this.state.onlinePlayers.map(player => (
						<Player player={player} onClick={() => this.playerSelected(player)}/>
					))
				}
			</FloatingBox>
		);
	}
}
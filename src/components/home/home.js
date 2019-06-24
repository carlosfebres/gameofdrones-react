import React, {Component} from 'reactn';
import logo from '../../assets/images/logo.png';
import './home.css';
import FloatingBox from "../floating-box/floating-box";
import Player from "../player/player";

export default class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			gameRequest: false,
			playerRequest: null,
			game: null,
			onlinePlayers: []
		};
	}

	componentDidMount() {
		this.global.socket.emit("registerPlayer", this.global.nickname);
		this.global.socket.on("onlinePlayers", users => {
			this.setState({onlinePlayers: users});
		});
		this.global.socket.on("gameRequest", data => {
			this.setState({
				gameRequest: true,
				playerRequest: data.from,
				game: data.game
			});
		});
		this.global.socket.on("startGame", data => {
			this.setGlobal({game: data.game});
			this.props.history.push(`playing/${data.player}`);
		});
		this.loadOnlineUsers();
		setInterval(() => this.loadOnlineUsers(), 1000);
	}

	responseGameRequest(response) {
		this.setState({
			gameRequest: false,
			playerRequest: null,
			game: null
		});
		this.global.socket.emit("gameResponse", {
			accepted: response,
			game: this.state.game
		});
	}

	loadOnlineUsers() {
		this.global.socket.emit("getOnlinePlayers");
	}

	render() {
		if (this.state.gameRequest) {
			return (
				<FloatingBox>
					<p>{this.state.playerRequest} wants to play with you. Do you accept?</p>
					<button onClick={()=>this.responseGameRequest(true)}>Accept</button>
					<button onClick={()=>this.responseGameRequest(false)}>Decline</button>
				</FloatingBox>
			);
		}
		return (
			<FloatingBox>
				<img className="logo" src={logo} alt="Logo"/>
				<p>Hi {this.global.nickname}</p>
				<h2 className="title">Game Of Drones</h2>
				{this.state.onlinePlayers.length ? (
					<>
						<h4 className="onlinePlayersTitle">Online Users: </h4>
						{
							this.state.onlinePlayers.map(player => (
								<Player key={player.nickname} player={player}/>
							))
						}
					</>
				) : (
					<h2 className="noOnlinePlayers">No Online Players</h2>
				)}
			</FloatingBox>
		);
	}
}
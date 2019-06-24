import React, {Component} from 'reactn';
import FloatingBox from "../floating-box/floating-box";
import './game.css';
import Loading from "../loading/loading";
import PickMove from "../pick-move/pick-move";
import Move from "../move/move";

export default class GameScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rounds: 3,
			playing: false,
			move: null,
			opponentMove: null,
			game: null,
			player1: null,
			result: null
		};

		this.moveSelected = this.moveSelected.bind(this);
	}

	componentDidMount() {
		if (this.global.game) {
			this.startGame(this.global.game);
			this.player1 = false;
		} else {
			this.player1 = true;
			this.global.socket.emit('requestGame', this.props.match.params.player);
		}
		this.global.socket.on('gameResponse', data => {
			if (data.accepted) {
				this.setGlobal({game: data.game})
				this.startGame(data.game);
			} else {
				alert(this.props.match.params.player + " doesn't want to play.");
				this.props.history.push('/home');
			}
		});
		this.global.socket.on('revealMoves', data => {
			const myMove = this.player1 ? data.round.byPlayer1 : data.round.byPlayer2;
			const opponentMove = !this.player1 ? data.round.byPlayer1 : data.round.byPlayer2;
			console.log(myMove, opponentMove);
			const myScore = myMove.beats.indexOf(opponentMove._id) >= 0 ? 1 : 0;
			const opponentScore = opponentMove.beats.indexOf(myMove._id) >= 0 ? 1 : 0;
			console.log(myScore, opponentScore);
			let result, rounds = this.state.rounds;
			switch (myScore - opponentScore) {
				case 1:
					result = "You Win!";
					rounds--;
					break;
				case 0:
					result = "It's a tie!";
					break;
				case -1:
					result = "You Loose!";
					rounds--;
					break;
				default:
					break;
			}
			;
			this.setState({
				result,
				opponentMove,
				rounds
			});
			setTimeout(() => {
				if (rounds > 0) {
					this.setState({
						move: null,
						result: null,
						opponentMove: null
					});
				} else {
					alert("Game Finished!");
					this.global.socket.emit('gameFinished', {game: this.state.game})
					this.props.history.push("/");
				}
			}, 4000);
		});
	}

	startGame(game) {
		console.log("Game", game);
		this.setState({
			playing: true,
			game
		});
	}

	moveSelected = (move) => {
		console.log("Move Selected");
		console.log(move);
		this.global.socket.emit('moveSelected', {
			game: this.state.game,
			move
		});
		this.setState({move});
	}

	render() {
		if (this.state.playing) {
			if (!this.state.move) {
				return (
					<>
						<div className="spacingTop">
							<p>Rounds left: {this.state.rounds}</p>
						</div>
						<PickMove onMoveSelected={this.moveSelected}/>
					</>
				);
			} else {
				if (this.state.opponentMove) {
					return (
						<div className="spacingTop">
							<table>
								<tbody>
								<tr>
									<td><Move move={this.state.move}/></td>
									<td>VS</td>
									<td><Move move={this.state.opponentMove}/></td>
								</tr>
								<tr>
									<td colSpan={3}>{this.state.result}</td>
								</tr>
								</tbody>
							</table>
						</div>
					);
				} else {
					return (
						<FloatingBox>
							<Loading text="Waiting For your Opponent To Move..."/>
						</FloatingBox>
					);
				}
			}
		} else {
			return (
				<FloatingBox>
					<Loading text="Waiting For User To Accept..."/>
				</FloatingBox>
			);
		}
	}

}
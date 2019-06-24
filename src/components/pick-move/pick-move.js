import React, {Component} from 'reactn';
import Move from "../move/move";
import './pick-move.css';

export default class PickMove extends Component {

	render() {
		return (
			<div className="pick-container" align="center">
				<h2 className="pick-move-title">Choose a move</h2>
				<div className="move-container">
					{this.global.moves.map(move => <Move key={move.name} click={this.props.onMoveSelected} move={move} />)}
				</div>
			</div>
		);
	}

}
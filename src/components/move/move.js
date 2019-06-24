import React, {Component} from 'reactn';
import './move.css'

export default class Move extends Component {

	constructor(props) {
		super(props);
		this.state = {
			buttonStyle: {
				backgroundImage: `url('${this.props.move.image}'),linear-gradient(rgb(240, 167, 1), rgb(176, 122, 0))`
			}
		};
	}

	render() {
		return (
			<button className="move" onClick={() => this.props.click(this.props.move)} style={this.state.buttonStyle}></button>
		);
	}

}
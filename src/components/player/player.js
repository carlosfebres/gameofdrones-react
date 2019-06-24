import React, {Component} from 'reactn';

export default class Player extends Component {

	render() {
		return (
			<button onClick={this.props.onClick}>{this.props.user.nickname}</button>
		);
	}

}
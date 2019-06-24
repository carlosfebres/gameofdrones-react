import React, {Component} from 'reactn';
import './floating-box.css'

export default class FloatingBox extends Component {
	render() {
		return (
			<div
				className={"floating-box " + (this.props.vertical === 'center' ? 'vertical-center ' : '') + (this.props.horizontal === 'center' ? 'horizontal-center' : '')}>
				{this.props.children}
			</div>
		);
	}
}
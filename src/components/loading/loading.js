import React, {Component} from 'reactn';
import loader from "../../assets/images/loader.gif";
import './loading.css';

export default class Loading extends Component {
	render() {
		return (
			<>
				<img className="loading-image" src={loader} alt="Loader"/>
				<h2 className="loading-title">{this.props.text}</h2>
			</>
		);
	}
}
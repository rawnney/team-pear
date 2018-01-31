import React, { Component } from "react";
import { Modal } from "reactstrap";

export default class winnerPopUp extends Component{
	constructor (props){
		super(props);
		this.state = {isModalOpen: false};
		//console.log(this.props);//without super(props) the readout will be undefined (but in this case the readout will be the contense of props)
	}

	render () {
		return (
			<div>
				<button onClick={() => this.openModal()}>Open Modal</button>
				<Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
					<h1>Modal title</h1>
					<p>Hello Hugo</p>
					<p><button onClick={() => this.closeModal()}>Close</button></p>
				</Modal>
			</div>
		);
	}

	openModal(){
		this.setState({ isModalOpen: true });
	}
	closeModal(){
		this.setState({ isModalOpen: false });
	}

}

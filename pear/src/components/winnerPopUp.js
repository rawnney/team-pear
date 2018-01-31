import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class winnerPopUp extends Component{
	constructor (props){
		super(props);
		this.state = {Modal: false};
		//console.log(this.props);//without super(props) the readout will be undefined (but in this case the readout will be the contense of props)

		this.toggle = this.toggle.bind(this);
	}

	toggle(){
		this.setState({
			modal: !this.state.modal
		});
	}

	render () {
		return (
			<div>
				<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
				<Modal inOpen={this.state.modal} modalTransition={{timeoutout: 20}} bacldropTransition={{timeout: 10 }}
					toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Modal Title</ModalHeader>
					<ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.toggle}>Do Something</Button>{""}
						<Button color='secondary' onClick={this.toggle}>Cansel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

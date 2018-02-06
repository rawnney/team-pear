import React, { Component } from 'react'
import {Modal, ModalHeader, Button, Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'
import Welcome from './Welcome'
import Database from '../Database'
import Images from '../libs/Imgs'
let {Pear} = Images
// import Routes from '../Routes'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      loggedIn: false,
      modal: true
    }
  }

  signIn (username, password) {
    let {loggedIn} = this.state
    if (loggedIn === false) {
      this.props.setLoggedIn()
      return this.setState({loggedIn: true, user: {username, password}})
    }
  }

  signOut () {
    // clear out user from state
    this.setState({user: null})
  }

  togglemod = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  // validateForm () {
  //   return this.state.email.length > 0 && this.state.password.length > 0
  // }

  render () {
    let {togglemod} = this.props
    let {loggedIn, modal, user} = this.state
    return (
      <Modal isOpen={modal} togglemod={this.togglemod} style={styles.test}>
        <ModalHeader toggle={this.toggle} style={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
          <img style={{width: '100px', height: '160px'}} src={Pear} />
          <br />
          <h1>Team Pear Game Page</h1>
        </ModalHeader>
        {/*
          <header className="col-md-12">
          <div className="logo-image" >
            <img src={Pear} />
          </div>
          <div className="slogan">
            <h1>Team Pear Game Page</h1>
          </div>
        </header>
        */}

        <section className="section-padding button-container">

          <div className="buttons">
            <hr className="prettyline" />
            <div className="button-div">
              {
                (this.state.user)
                  ? <Welcome
                    user={this.state.user}
                    onSignOut={this.signOut.bind(this)}
                  />
                  : <button type="button" className="btn btn-success ribbon" href="#signup" data-toggle="modal" data-target=".bs-modal-sm">Sign In / Sign Up</button>
              }
            </div>
            <br />
            <Button color="primary">Leaderboard</Button>
            {/* <div className="button-div">
              <button type="button" className="btn btn-primary ribbon">Leaderboard</button>
            </div> */}
            <br />
            <Button color="info">Info/Rules</Button>
            <br />
            <Button color="warning">Övrigt</Button>
            <hr className="prettyline" />
          </div>

        </section>
        {/* modal starts */}
        <section>

          <div className="modal fade bs-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <br/>
                <div className="bs-example">
                  <ul id="myTab" className="nav nav-tabs">

                    <li className="general"><a href="#signin" data-toggle="tab">Sign In</a></li>
                    <li className="general"><a href="#signup" data-toggle="tab">Register</a></li>
                    <li className="general"><a href="#why" data-toggle="tab">Whdy?</a></li>
                  </ul>
                </div>

                <div className="modal-body">
                  <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade in" id="why">
                    </div>
                    <div className="tab-pane fade active in" id="signin">
                      <div>
                        {
                          <LoginForm onSignIn={this.signIn.bind(this)}/>
                        }
                      </div>

                    </div>
                    <div className="tab-pane fade" id="signup">
                      <Form>
                        <FormGroup row>
                          <Label for="exampleEmail" sm={4}>Email</Label>
                          <Col sm={8}>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Your email" />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="Alias" sm={4}>Alias</Label>
                          <Col sm={8}>
                            <Input type="alias" name="alias" id="alias" placeholder="Ex: 'BootyWarrior'" />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="examplePassword" sm={4}>Password</Label>
                          <Col sm={8}>
                            <Input type="password" name="password" id="examplePassword" placeholder="*******" />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="examplePassword" sm={4}>Re-Enter Password</Label>
                          <Col sm={8}>
                            <Input type="password" name="password" id="examplePassword" placeholder="*******" />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="checkbox2" sm={4}></Label>
                          <Col sm={{ size: 8 }}>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" id="checkbox2" />{'Team Red'}
                                <br />
                                <Input type="checkbox" id="checkbox2" />{'Team Blue'}
                              </Label>
                            </FormGroup>
                          </Col>
                        </FormGroup>
                        <FormGroup check row>
                          <Col sm={{ size: 10, offset: 1 }}>
                            <Button color="primary">Submit</Button>
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <center>
                    <Button color="danger" data-dismiss="modal">Close</Button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal>
    )
  }
}

let styles = {
  test: {
    height: '100%',
    width: '100%'
  }
}

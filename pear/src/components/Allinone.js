import React, { Component } from 'react'
import MapView from './MapView'
import CharacterView from './CharacterView'
import FightView from './FightView'
import { Button, Modal } from 'reactstrap'
import Home from './Home'
import Welcome from './Welcome'
import LoginForm from './LoginForm'
import Images from '../libs/Imgs'
let {Pear} = Images

export default class Allinone extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      loggedIn: false,
      user: null
    }
  }

  componentDidMount () {
    { /* getUser(userName, pass).then(() => {
      this.setState({user})
    }) */ }
    { /* this.setState() */ }
  }

  componentWillMount () {}

  render () {
    let {togglemod} = this.props
    let {loggedIn, modal, user} = this.state
    // let {user} = this.state
    return (
      <div>
        <Button onClick={this.togglemod} style={{width: '10%', position: 'relative'}}>LOGIN</Button>
        {modal ? <Modal isOpen={loggedIn} togglemod={this.togglemod}>
          <div style={styles.test}>
            <header className="col-md-12">
              <div className="logo-image" >
                <img src={Pear} />
              </div>
              <div className="slogan">
                <h1>Team Pear Game Page</h1>
              </div>
            </header>

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
                <div className="button-div">
                  {
                    (this.state.user)
                      ? <div to='/GameView'>
                        <button id="signin" name="signin" className="btn btn-success ribbon" type="submit">Go To GameView</button>
                      </div>
                      : <div></div>
                  }
                </div>
                <div className="button-div">
                  <button type="button" className="btn btn-primary ribbon">Leaderboard</button>
                </div>
                <div className="button-div">
                  <button type="button" className="btn btn-info ribbon">Info/Rules</button>
                </div>
                <div className="button-div">
                  <button type="button" className="btn btn-warning ribbon">Övrigt</button>
                </div>
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
                        <li className="general"><a href="#why" data-toggle="tab">Why?</a></li>
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
                          <form className="form-horizontal">
                            <fieldset>

                              {/* Sign Up Form Text input */}
                              <div className="control-group">
                                <label className="control-label">Email:</label>
                                <div className="controls">
                                  <input id="Email" name="Email" className="form-control" type="text" placeholder="youremail@example.com" className="input-large" required=""/>
                                </div>
                              </div>

                              {/* Text input */}
                              <div className="control-group">
                                <label className="control-label" >Alias:</label>
                                <div className="controls">
                                  <input id="userid" name="userid" className="form-control" type="text" placeholder="JoeSixpack" className="input-large" required=""/>
                                </div>
                              </div>

                              {/* Password input */}
                              <div className="control-group">
                                <label className="control-label">Password:</label>
                                <div className="controls">
                                  <input id="password" name="password" className="form-control" type="password" placeholder="********" className="input-large" required=""/>
                                  <em>1-8 Characters</em>
                                </div>
                              </div>

                              {/* Text input */}
                              <div className="control-group">
                                <label className="control-label" >Re-Enter Password:</label>
                                <div className="controls">
                                  <input id="reenterpassword" className="form-control" name="reenterpassword" type="password" placeholder="********" className="input-large" required=""/>
                                </div>
                              </div>

                              {/* Multiple Radios (inline) */}
                              <br/>
                              <div className="control-group">
                                <label className="control-label">Humanity Check:</label>
                                <div className="controls">
                                  <label className="radio inline">
                                    <input type="radio" name="humancheck" id="humancheck-0" value="robot" checked="checked" />I am a Robot
                                  </label>
                                  <label className="radio inline" >
                                    <input type="radio" name="humancheck" id="humancheck-1" value="human"/>I am Human
                                  </label>
                                </div>
                              </div>

                              {/* Button */}
                              <div className="control-group">
                                <label className="control-label" ></label>
                                <div className="controls">
                                  <button id="confirmsignup" name="confirmsignup" className="btn btn-success">Sign Up</button>
                                </div>
                              </div>
                            </fieldset>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <center>
                        <button type="button" id="close-btn" className="btn btn-default" data-dismiss="modal">Close</button>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
      )
    }
  }
        </Modal> : <div />}
        <CharacterView /> {/* user={user} */}
        <MapView />
        {/* <Button onClick={this.togglemod} style={{width: '10%', position: 'absolute'}}>FIGHTVIEW</Button> */}
        {/* modal ? <Modal isOpen={modal} togglemod={this.togglemod}>
          <FightView />
        </Modal> : <div /> */}
      </div>
    )
  }

  togglemod = () => this.setState({modal: !this.state.modal})

  signIn (username, password) {
    this.setState({
      user: {
        username,
        password
      }
    })
  }

  signOut () {
    this.setState({user: null})
  }
}

let styles = {
  test: {
    height: '100%',
    width: '100%'
  }
}

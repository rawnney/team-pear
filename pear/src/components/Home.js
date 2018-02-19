import React, {Component} from 'react'
// eslint-disable-next-line
import {Modal, ModalHeader, Button, Nav, NavItem, NavLink, TabContent, TabPane, ModalFooter, ModalBody} from 'reactstrap'
import LoginForm from './LoginForm'
import NoRegComponent from './NoRegComponent'
import SignUpComponent from './SignUpComponent'
import Welcome from './Welcome'
import LeaderboardComponent from './LeaderboardComponent'
import InfoComponent from './InfoComponent'
import Images from '../libs/Imgs'
import classnames from 'classnames'

let {Pear} = Images
<<<<<<< HEAD
// import Routes from '../Routes'

=======

>>>>>>> nasimNew
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      modalLogin: false,
      modalLeaderboard: false,
      modalInfo: false,
      activeTab: '1'
    }
  }

  signIn = (user) => {
    let {setUser} = this.props
    this.setState({user, modalLogin: false})
    if (setUser) setUser(user)
  }

  setLoggedIn = () => {
    let {setLoggedIn} = this.props
    this.setState({loggedIn: setLoggedIn()})
  }

  signOut = (user) => {
    this.saveProgress()
    this.setState({user: null, loggedIn: false})
  }

  saveProgress = (user) => {
    let {monstersKilled, coins} = this.state
    let {updateUser} = this.props
    updateUser(monstersKilled, coins)
    this.setState({user: {...user, monstersKilled, coins}})
  }

  toggleLogin = () => {
    this.setState({
      modalLogin: !this.state.modalLogin
    })
  }

<<<<<<< HEAD
  // validateForm () {
  //   return this.state.email.length > 0 && this.state.password.length > 0
  // }

  render () {
    let {togglemod} = this.props
    let {loggedIn, modal, user} = this.state
    return (
      <Modal isOpen={modal} togglemod={this.togglemod} style={styles.test}>
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
=======
  toggleLeaderboard = () => {
    this.setState({
      modalLeaderboard: !this.state.modalLeaderboard
    })
  }

  toggleInfo = () => {
    this.setState({
      modalInfo: !this.state.modalInfo
    })
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  // TODO: Validate with db
  // validateForm () {
  //   return this.state.email.length > 0 && this.state.password.length > 0
  // }

  render () {
    let {modalLogin, modalLeaderboard, modalInfo, activeTab} = this.state
    return <main style={styles.wrapper}>
      <header>
        <img style={styles.logo} src={Pear} alt='Pear'/>
        <h1>Pear Game</h1>
      </header>
      <section style={styles.section}>
        <div style={styles.buttoncontainer}>
          {this.renderLoginExit()}
          <Button style={styles.button} onClick={this.toggleLeaderboard} color="primary">Leaderboard</Button>
          <Button style={styles.button} onClick={this.toggleInfo} color="info">Info</Button>
        </div>
      </section>
      <Modal style={styles.modalStyle} isOpen={modalLogin} toggleLogin={this.toggleLogin} className={this.props.className}>
        <ModalHeader>
          <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { this.toggle('1') }}>
              Sign In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { this.toggle('2') }}>
              Sign up
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { this.toggle('3') }}>
              Play now!
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <ModalBody>
                <LoginForm onSignIn={this.signIn} />
              </ModalBody>
            </TabPane>
            <TabPane tabId="2">
              <ModalBody>
                <SignUpComponent onSignIn={this.signIn}/>
              </ModalBody>
            </TabPane>
            <TabPane tabId="3">
              <ModalBody>
                <NoRegComponent onSignIn={this.signIn} />
              </ModalBody>
            </TabPane>
          </TabContent>
          <ModalFooter style={styles.section}>
            <Button color="danger" onClick={this.toggleLogin}>Cancel</Button>
          </ModalFooter>
        </ModalHeader>
      </Modal>
      <Modal style={styles.modalStyle} isOpen={modalLeaderboard} toggleLogin={this.modalLeaderboard}>
        <ModalHeader>
          Leaderboard
        </ModalHeader>
        <LeaderboardComponent />
        <ModalFooter style={styles.section}>
          <Button color="danger" onClick={this.toggleLeaderboard}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal style={styles.modalStyle} isOpen={modalInfo} toggleLogin={this.modalLeaderboard}>
        <ModalHeader>
          Info
        </ModalHeader>
        <InfoComponent />
        <ModalFooter style={styles.section}>
          <Button color="danger" onClick={this.toggleInfo}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </main>
  }

  renderLoginExit = () => {
    let {user} = this.state
    if (user != null) return <Welcome user={user.username} goToGame={this.setLoggedIn} signOut={this.signOut}/>
    else return <Button style={styles.button} onClick={this.toggleLogin} color="success">Sign In / Sign Up</Button>
  }
}

let styles = {
  modalStyle: {
    display: 'flex',
    justifyContent: 'center'
  },
  wrapper: {
    marginTop: '50px',
    textAlign: 'center'
  },
  logo: {
    height: '160px'
  },
  section: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttoncontainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '200px',
    alignItems: 'center'
  },
  button: {
    margin: '10px',
    width: '200px'
  }
}
>>>>>>> nasimNew

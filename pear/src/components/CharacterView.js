import React, { Component } from 'react'
import sword from '../assets/img/sword.png'
// import Items from './items'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default class CharacterView extends Component {
  constructor (props) {
    super(props)
    // let {user} = this.props
    this.state = {
      username: 'sTor-Lazze', // user.username
      name: 'Lasse', // user.name
      lastname: 'Kroner', // user.lastname
      email: 'Lasse@kroner.iDid', // user.email

      sword: '+25',
      blockChance: '5%',
      magic: '+10'

    }
  }

  render () {
    let {username} = this.state
    return (
      <section style={{display: 'flex', justifyContent: 'center'}}>
        <button style={{width: '10%'}} type="button" className="btn btn-success menu-button" href="#signup" data-toggle="modal" data-target=".bs-modal-sm">Menu</button>
        <div className="modal fade bs-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <br/>
              <div className="bs-example bs-example-tabs">
                <ul id="myTab" className="nav nav-tabs">
                  <li className="btn btn-primary  menu-button"><a style={{textDecoration: 'none', color: 'inherit'}} href="#MyAccount" data-toggle="tab">My Account</a></li>
                  <li className="btn btn-primary  menu-button"><a style={{textDecoration: 'none', color: 'inherit'}}
                    href="#inventory" data-toggle="tab">Inventory</a></li>
                  <li className="active btn btn-primary  menu-button"><a style={{textDecoration: 'none', color: 'inherit'}} href="#skills" data-toggle="tab">Skills</a></li>

                </ul>
              </div>
              <div className="modal-body">
                <div id="myTabContent" className="tab-content">
                  <div className="tab-pane fade in" id="MyAccount">
                    <ModalHeader toggle={this.toggle}>My Account</ModalHeader>
                    <br/>
                    <ul style={{listStyle: 'none'}}>
                      <li><p>USERNAME: {username}</p> </li> /* onChange={(text) => this.setState({username: text})} */
                      <li><p>FIRST NAME: {this.state.name}</p></li>
                      <li><p>LAST NAME: {this.state.lastname}</p></li>
                      <li><p>EMAIL: {this.state.email}</p></li>
                    </ul>

                    <Button color="success">Edit</Button>
                  </div>
                  <div className="tab-pane fade active in" id="skills">
                    <ModalHeader toggle={this.toggle}>Skillz</ModalHeader>
                    <br/>
                    <ul style={{listStyle: 'none'}}>
                      <li><p>MEELE DAMAGE: {this.state.sword}</p> </li>
                      <li><p>BLOCK CHANCE: {this.state.blockChance}</p></li>
                      <li><p>SPELL DAMAGE: {this.state.magic}</p></li>
                    </ul>
                  </div>
                  <div className="tab-pane fade" id="inventory">
                    <ModalHeader toggle={this.toggle}>Inventory</ModalHeader>
                    <ul style={{listStyle: 'none'}}>
                      <br/>

                      <li><img style={{width: '40px', height: '40px'}} src={require('../assets/img/sword.png')} />
                        <img style={{width: '40px', height: '40px'}} src={require('../assets/img/wand.png')} />
                        <img style={{width: '40px', height: '40px'}} src={require('../assets/img/shield.png')} />
                      </li>
                      <br/>
                      <li><img style={{width: '40px', height: '40px'}} src={require('../assets/img/dagger.png')} />
                        <img style={{width: '40px', height: '40px'}} src={require('../assets/img/armor.png')} />
                      </li>

                    </ul>

                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <center>
                  <button type="button" className="btn btn-danger  menu-button" data-dismiss="modal">Close</button> /* saveButton = this.saveUser(this.state.user) */
                </center>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

//
// <section className='CharacterViewWrapper'>
//   <button />
//   <div className='CharacterWrapper'>
//     <div className='CharacterContainer'>
//   CharacterContainer
//     </div>
//     <div className='SkillContainer'>
//   SkillContainer
//     </div>
//   </div>
// </section>

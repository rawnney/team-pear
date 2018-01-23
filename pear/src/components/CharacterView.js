import React, { Component } from 'react'

export default class CharacterView extends Component {
  render () {
    return (

      <section>
        <button type="button" className="btn btn-success ribbon menu-button" href="#signup" data-toggle="modal" data-target=".bs-modal-sm">Menu</button>
        <div className="modal fade bs-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <br/>
              <div className="bs-example bs-example-tabs">
                <ul id="myTab" className="nav nav-tabs">
                  <li className="active"><a href="#signin" data-toggle="tab">Sign In</a></li>
                  <li className=""><a href="#signup" data-toggle="tab">Register</a></li>
                  <li className=""><a href="#why" data-toggle="tab">Why?</a></li>
                </ul>
              </div>
              <div className="modal-body">
                <div id="myTabContent" className="tab-content">
                  <div className="tab-pane fade in" id="why">
                  </div>
                  <div className="tab-pane fade active in" id="signin">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                      <fieldset>
                        {/* Sign In Form */}
                        {/* Text input */}
                        <div className="control-group">
                          <label className="control-label">User Name:</label>
                          <div className="controls">
                            <input required="" id="userid" name="userid" type="text" className="form-control" placeholder="" className="input-medium" required=""
                            />
                          </div>
                        </div>

                        {/* Password input */}
                        <div className="control-group">
                          <label className="control-label">Password:</label>
                          <div className="controls">
                            <input required="" id="passwordinput" name="passwordinput" className="form-control" type="password" placeholder="********" className="input-medium"
                            />
                          </div>
                        </div>

                        {/* - Multiple Checkboxes (inline) */}
                        <div className="control-group">
                          <label className="control-label" ></label>
                          <div className="controls">
                            <label className="checkbox inline">
                              <input type="checkbox" name="rememberme" id="rememberme-0" value="Remember me" />Remember me
                            </label>
                          </div>
                        </div>

                        {/* Button */}
                        <div className="control-group">
                          <label className="control-label"></label>
                          <div className="controls">

                            <button id="signin" name="signin" className="btn btn-success" type="submit">Sign In</button>

                          </div>
                        </div>
                      </fieldset>
                    </form>
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
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
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

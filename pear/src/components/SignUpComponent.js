import React from 'react'
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation'
import { Button, Label, FormGroup } from 'reactstrap'
import Images from '../libs/Imgs'
import {capitalizeFirstLetter} from '../libs/Common'
import axios from 'axios'

let {Avatar1, Avatar2, Avatar3, Avatar4 } = Images
const API_USERS = 'http://peargameapi.herokuapp.com/api/users/'

export default class Example extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {user: {}}
  }

  handleSubmit (event, errors, values) {
    if (values.originalEmail === '' || values.originalEmail === '') {
      errors.push('originalEmail', 'confirmationEmail')
    }
    this.setState({errors, values})

    // const { username, originalEmail, password, avatar, selectTeam } = this.state.values
    this.setState({user: this.state.values})
    // axios.post(API_USERS, { username, password, originalEmail, avatar, selectTeam })
    //   .then((result) => {
    //     const user = null
    //     if (onSignIn) onSignIn(user)
    //   })
  }

  render () {
    return (
      <div>
        <AvForm onSubmit={this.handleSubmit}>
          {this.state.values && <div style={styles.error}>
            <div>Invalid Submission: {this.state.errors.join(', ')}<br /></div>

          </div>}
          <AvGroup>
            <Label for="username" sm={4}>Username</Label>
            <AvInput type="username" name="username" id="username" placeholder="Ex: 'BootyWarrior'" required />
            {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
            <AvFeedback>This is an error!</AvFeedback>
          </AvGroup>

          <AvGroup>
            <Label for="originalEmail" sm={4}>Email</Label>
            <AvField name="originalEmail" placeholder="example.email@example.com" id="email" type="email" />
          </AvGroup>

          <AvGroup>
            <Label for="confirmationEmail" sm={4}>Confirm Email</Label>
            <AvInput name="confirmationEmail" id="confirmationEmail" type="email" placeholder="example.email@example.com" validate={{match: {value: 'originalEmail'}}}/>
          </AvGroup>

          <AvGroup>
            <Label for="password" sm={4}>Password</Label>
            <AvInput name="password" id="password" type="password" required/>
          </AvGroup>

          {/* Radios */}
          <AvRadioGroup name="avatar" label="Choose Your Avatar" required>
            <Label check>
              <AvRadio value="Avatar1" id="Avatar1" />
              <img style={styles.avatar} src={Avatar1} alt='Avatar1'/>
            </Label>
            <Label check>
              <AvRadio value="Avatar2" id="Avatar2" />
              <img style={styles.avatar} src={Avatar2} alt='Avatar2'/>
            </Label>
            <Label check>
              <AvRadio value="Avatar3" id="Avatar3" />
              <img style={styles.avatar} src={Avatar3} alt='Avatar3'/>
            </Label>
            <Label check style={styles.avatarBlock}>
              <AvRadio value="Avatar4" id="Avatar4" />
              <img style={styles.avatar} src={Avatar4} alt='Avatar4'/>
            </Label>

          </AvRadioGroup>
          {/* With select and AvField */}

          <AvField type="select" name="selectTeam" label="Select a Team" helpMessage="Select a team" required>
            <option value='' >Select a team</option>
            <option value='1' >Red</option>
            <option value='2'>Green</option>
            <option value='3'>Blue</option>
          </AvField>
          <FormGroup>
            <Button>Submit</Button>
          </FormGroup>
        </AvForm>

      </div>
    )
  }
}

let styles = {
  avatar: {
    height: '150px'
  },
  error: {
    color: '#c52e43'
  }
}

import React from 'react'
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation'
import { Button, Label, FormGroup } from 'reactstrap'
import Images from '../libs/Imgs'
import {capitalizeFirstLetter} from '../libs/Common'

let {Avatar1, Avatar2, Avatar3, Avatar4 } = Images

export default class Example extends React.Component {
  constructor (props) {
    super(props)

    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this)
    this.state = {user: {}}
  }

  handleInvalidSubmit (event, errors, values) {
    this.setState({errors, values})
  }
  handleUsername = (username) => {
    let {user} = this.state
    this.setState({user: {...user, username: capitalizeFirstLetter(username.target.value)}})
  }

  render () {
    return (
      <div>
        <AvForm onInvalidSubmit={this.handleInvalidSubmit}>

          <AvGroup>
            <Label for="username" sm={4}>Username</Label>
            <AvInput type="username" name="username" onChange={this.handleUsername} id="username" placeholder="Ex: 'BootyWarrior'" required />
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

          {/* Radios */}
          <AvRadioGroup name="avatar" label="Choose Avatar" required>
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

          <AvField type="select" name="selectTeam" label="Select a Team" helpMessage="Select a team">
            <option value='1'>Red</option>
            <option value='2'>Green</option>
            <option value='3'>Blue</option>
          </AvField>
          <FormGroup>
            <Button>Submit</Button>
          </FormGroup>
        </AvForm>
        {this.state.values && <div>
          <h5>Submission values</h5>
          Invalid: {this.state.errors.join(', ')}<br />
          Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
        </div>}
      </div>
    )
  }
}

let styles = {
  avatar: {
    height: '150px'
  }
}

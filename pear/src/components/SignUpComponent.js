import React, { Component } from 'react'
import {Form, FormGroup, Label, Input, Col, Button} from 'reactstrap'

export default class SignUpComponent extends Component {
  render () {
    return (
      <Form>
        <FormGroup row>
          <Label for="exampleEmail" sm={4}>Email</Label>
          <Col sm={8}>
            <Input type="email" name="email" id="exampleEmail" placeholder="Your email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="username" sm={4}>Username</Label>
          <Col sm={8}>
            <Input type="username" name="username" id="username" placeholder="Ex: 'BootyWarrior'" />
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
                <Input color="danger" type="checkbox" id="checkbox2" />{'Team Red'}
                <br />
                <Input color="primary" type="checkbox" id="checkbox2" />{'Team Blue'}
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup>
          <Button color="primary">Sign up</Button>
        </FormGroup>
      </Form>
    )
  }
}

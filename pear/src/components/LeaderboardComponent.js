import React, {Component} from 'react'
// eslint-disable-next-line
import {Table} from 'reactstrap'

export default class Leaderboard extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    // getAllUsers = () => {}
  }

  render () {
    return <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  }

  getAllUsers = () => {}

  sortUsers = () => {}

  returnSortedUsers = () => {}
}

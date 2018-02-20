import React, {Component} from 'react'
// eslint-disable-next-line
import {Table} from 'reactstrap'
import axios from 'axios'
const API_GETUSERS = `https://peargameapi.herokuapp.com/api/users`

export default class Leaderboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      persons: []
    }
  }
  componentDidMount () {
    axios.get(API_GETUSERS)
      .then(res => {
        const persons = res.data.Users
        this.setState({ persons })
      })
  }

  const myData = [].concat(this.state.monstersKilled)
    .sort((a, b) => a.itemM > b.itemM)
    .map((item, i) =>
        <div key={i}> {item.matchID} {item.timeM}{item.description}</div>
    );

  render () {
    return <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Team</th>
            <th>Monsters Killed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Winner is:</th>
            <td>{ this.state.persons.map(persons => <p>{persons.username}</p>)}</td>
            <td>{ this.state.persons.map(persons => <p>{persons.team}</p>)}</td>
            <td>{ this.state.persons.map(persons => <p>{persons.monstersKilled}</p>)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  }
}

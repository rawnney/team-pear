import React, {Component} from 'react'
// eslint-disable-next-line
import {Table} from 'reactstrap'
import axios from 'axios'
const API_GETUSERS = `https://peargameapi.herokuapp.com/api/users`

export default class Leaderboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      leaderboardData: []
    }
  }
  componentDidMount () {
    axios.get(API_GETUSERS)
      .then(res => {
        const leaderboardData = res.data.Users
        this.setState({ leaderboardData })
        console.log(JSON.stringify(leaderboardData))
      })
  }

  render () {
    function sortData (first, second) {
      let firstTime = first.monstersKilled
      let secondTime = second.monstersKilled
      if (firstTime === secondTime) { return 0 }
      if (firstTime > secondTime) { return -1 } else { return 1 }
    }
    let list = this.state.leaderboardData.sort(sortData).map((leaderboardData, index) => {
      return (
        <tr key={index}>
          <td scope="row"><li></li></td>
          <td>{leaderboardData.username}</td>
          <td>{leaderboardData.team}</td>
          <td>{leaderboardData.monstersKilled}</td>

        </tr>
      )
    })
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
          <ol>
            {list}
          </ol>
        </tbody>
      </Table>
    </div>
  }
}

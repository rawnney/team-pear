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
        <table key={index}>

          <td>{leaderboardData.username}</td>
          <td>{leaderboardData.team}</td>
          <td>{leaderboardData.monstersKilled}</td>

        </table>
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
          <tr>
            <th scope="row">Winner is:</th>
            <td>{list}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  }
}

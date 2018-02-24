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
    let list = this.state.leaderboardData.sort(sortData).map((leaderboardData, i) => {
      return (
        <tr key={i}>
          <th><li></li></th>
          <td>{leaderboardData.username}</td>
          <td key={i} style={[styles.teamBorder, this.getTeamColor(i)]}>{leaderboardData.team}</td>
          <td>{leaderboardData.monstersKilled}</td>

        </tr>
      )
    })
    return <div>
      <ol style={styles.list}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Team</th>
              <th>Kills</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </Table>
      </ol>
    </div>
  }

  getTeamColor = (i) => {
    let {leaderboardData} = this.state
    let teamColor = JSON.stringify(leaderboardData[i].team)
    console.log(teamColor)
    if (teamColor === 'GREEN') return styles.teamGreen
    if (teamColor === 'BLUE') return styles.teamGreen
    if (teamColor === 'RED') return styles.teamGreen
    if (teamColor === null) return styles.teamGreen
    if (teamColor === undefined) return styles.teamGreen
  }
}

let styles = {
  list: {
    paddingLeft: '10px'
  },
  teamBorder: {
    textAlign: 'center',
    borderRadius: '25px'
  },
  teamGreen: {
    backgroundColor: 'green'
  },
  teamBlue: {
    backgroundColor: 'blue'
  },
  teamRed: {
    backgroundColor: 'red'
  }
}

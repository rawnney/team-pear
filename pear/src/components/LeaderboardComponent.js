/* eslint-disable */
import React, {Component} from 'react'
// eslint-disable-next-line
import {Table} from 'reactstrap'
import axios from 'axios'
import Loader from './Loader'
import {API_USERS} from '../libs/Const'

export default class Leaderboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      leaderboardData: [],
      loader: false
    }
  }
  componentDidMount () {
    this.setState({loader: true})
    axios.get(API_USERS)
      .then(res => {
        const leaderboardData = res.data.Users
        if (leaderboardData !== undefined) this.setState({ leaderboardData, loader: false })
        // console.log(JSON.stringify(leaderboardData))
      })
  }

  render () {
    let {loader} = this.state
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
    let temp = {GREEN: 0, BLUE: 0, RED: 0}

    let sumUp = this.state.leaderboardData.map((leaderboardData) => {
      temp[leaderboardData.team] += leaderboardData.monstersKilled
    })
    // console.log(temp)
    // console.log(sumUp)

    return <div>
      {loader ? <Loader />
        : <ol style={styles.list}>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>GREEN: {temp.GREEN}</th>
                <th>BLUE: {temp.BLUE}</th>
                <th>RED: {temp.RED}</th>
              </tr>
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
        </ol>}
    </div>
  }

  getTeamColor = (i) => {
    let {leaderboardData} = this.state
    let {teamGreen, teamBlue, teamRed} = styles
    let teamColor = JSON.stringify(leaderboardData[i].team)
    // console.log(teamColor)
    if (teamColor === null) return // {teamGreen}
    if (teamColor === undefined) return // {teamGreen}
    if (teamColor === 'GREEN') return {teamGreen}
    if (teamColor === 'BLUE') return {teamBlue}
    if (teamColor === 'RED') return {teamRed}
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
  },
  loaderPosition: {
    display: 'flex',
    verticalAlign: 'middle',
    alignSelf: 'center'
  }
}

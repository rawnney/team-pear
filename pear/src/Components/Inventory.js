import React, {Component} from 'react'

class Inventory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      weapons: props.initialWeapons,
      arms: props.initialArms,
      shields: props.initialShields
    }
  }

  properties () {
    this.setState(
      {
        weapons: this.state.weapons,
        arms: this.state.arms,
        shields: this.state.shields
      }
    )
  }

  render () {
    return (
      <div >
        <div className="container">
          <h2>Carrying instruments</h2>
          <p>This table contians all of the informations of instruments</p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Weapons</th>
                <th>Arms</th>
                <th>Shields</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bombs[{this.state.weapons}]</td>
                <td>Guns[{this.state.arms}]</td>
                <td>Clapback[{this.state.shields}]</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}

export default Inventory

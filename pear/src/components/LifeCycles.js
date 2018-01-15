// @flow
import { Component } from 'react'

type Props = {}
type State = {}

export default class LifeCycles extends Component<Props, State> {
  state = {}

  componentWillMount () {
    // KÖRS FÖRST
    this.setState({})
  }

  componentDidMount () {
    // KÖRS EFTER RENDER
    this.setState({})
  }

  componentWillReceiveProps (nextProps: Object, nextState: Object) {

  }

  shouldComponentUpdate (): boolean {
    // måste använda extends Component istället för PureComponent
    return true || false
  }

  componentWillUpdate () {
    // KÖRS INNAN RENDER
    this.setState({})
    // this.setState(updater, [callback])
    // uppdaterar inte en komponent direkt, därför kan callbacken användas om man vill bero på statet
    // this.setState({}, () => {
    // CALLBACK
    // })
  }

  componentDidUpdate () {
    // KÖRS EFTER RENDER
    // FÅR INTE SÄTTA STATE
    // this.setState({})
  }

  componentWillUnmount () {
    // bra ställe att stoppa animeringar eller loopar!
  }

  // this.forceUpdate()
  // tvingar en render utan en shouldComponentUpdate
  // bör aldrig användas men kan vara bra för dev / test

  render () {
    return <div></div>
  }

  componentDidCatch () {
    // ERROR HANDLING => sker i AppStateManager
    // Bör inte användas i enskilda komponenter
  }
}

// angående ingen vpWidth och vpHeight
// ställen där det behövs: ex: knappar längst ner som tar upp hela skärmens width
// man får avända %
//

var styles = {
  container: {
  }
}

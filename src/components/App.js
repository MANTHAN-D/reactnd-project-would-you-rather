import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import SignIn from './SignIn'
class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(handleInitialData())
  }

  render() {
    if (this.props.signinRequired) {
      return <SignIn />
    }
    return <div>Loading App</div>
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    signinRequired: authedUser === null
  }
}

export default connect(mapStateToProps)(App)

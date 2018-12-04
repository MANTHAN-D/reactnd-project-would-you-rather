import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import SignIn from './SignIn'
import Header from './Header'
import HomePage from './HomePage'
import QuestionPage from './QuestionPage'
class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(handleInitialData())
  }

  render() {
    if (this.props.signinRequired) {
      return <SignIn />
    }
    return (
      <Fragment>
        <Header />
        {/* <HomePage /> */}
        <QuestionPage id={'xj352vofupe1dqz9emx13r'} />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    signinRequired: authedUser === null
  }
}

export default connect(mapStateToProps)(App)

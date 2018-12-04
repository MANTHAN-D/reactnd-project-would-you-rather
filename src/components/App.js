import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import { LoadingBar } from 'react-redux-loading'

import SignIn from './SignIn'
import Header from './Header'
import HomePage from './HomePage'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(handleInitialData())
  }

  render() {
    if (this.props.signinRequired) {
      return (
        <Fragment>
          <LoadingBar />
          <SignIn />
        </Fragment>
      )
    }
    return (
      <Fragment>
        <LoadingBar />
        <Header />
        {/* <HomePage /> */}
        {/* <QuestionPage id={'xj352vofupe1dqz9emx13r'} /> */}
        <NewQuestion />
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

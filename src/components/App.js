import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'

import { LoadingBar } from 'react-redux-loading'

import SignIn from './SignIn'
import Header from './Header'
import HomePage from './HomePage'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(handleInitialData())
  }

  componentDidUpdate = prevProps => {
    if (
      prevProps &&
      prevProps.authedUser === null &&
      this.props.authedUser !== null
    ) {
      this.props.dispatch(handleInitialData())
    }
  }

  render() {
    const { signinRequired } = this.props
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          {signinRequired === true ? (
            <SignIn />
          ) : (
            <Fragment>
              <Header />
              <Route path="/" exact component={HomePage} />
              <Route path="/questions/:id" exact component={QuestionPage} />
              <Route path="/add" exact component={NewQuestion} />
              <Route path="/leaderboard" exact component={LeaderBoard} />
            </Fragment>
          )}
        </Fragment>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    signinRequired: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)

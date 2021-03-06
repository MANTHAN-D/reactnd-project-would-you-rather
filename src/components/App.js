import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'

import LoadingBar from 'react-redux-loading'

import SignIn from './SignIn'
import Header from './Header'
import HomePage from './HomePage'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import SignUp from './SignUp'
import NotFound from './Error'
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
    const { signinRequired, toSignUp } = this.props
    return (
      <Fragment>
        <LoadingBar className="loading-bar-css" />

        {signinRequired === true ? (
          <SignIn />
        ) : toSignUp === true ? (
          <Route path="/signup" exact component={SignUp} />
        ) : (
          <Fragment>
            <Header />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/questions/:id" exact component={QuestionPage} />
              <Route path="/add" exact component={NewQuestion} />
              <Route path="/leaderboard" exact component={LeaderBoard} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authedUser }, props) => {
  return {
    signinRequired:
      authedUser === null && props.location.pathname !== '/signup'
        ? true
        : false,
    authedUser,
    toSignUp: props.location.pathname === '/signup' ? true : false
  }
}

export default withRouter(connect(mapStateToProps)(App))

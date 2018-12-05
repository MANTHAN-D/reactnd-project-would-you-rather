import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Image,
  Grid,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { HmacMD5 } from 'crypto-js'
import _ from 'lodash'

import { setAuthedUser } from '../actions/authedUser'

import './signin.css'

const DEFAULT_AVATAR =
  'https://github.com/MANTHAN-D/reactnd-project-would-you-rather/blob/master/public/avatars/john.png?raw=true'

const SIGNIN_ERROR = 'Invalid credentials! Try agian.'

class SignIn extends Component {
  state = {
    user: null,
    userId: undefined,
    password: undefined,
    avatarURL: DEFAULT_AVATAR,
    error: undefined
  }

  validatePassword = () => {
    const { users } = this.props
    const { userId, password } = this.state

    if (users[userId] === undefined) {
      return false
    }

    const currentWords = HmacMD5(password, 'salt').words
    const actualWords = users[userId].password.words

    return _.isEqual(actualWords, currentWords)
  }

  handleChange = e => {
    const { userIds, users } = this.props

    this.setState(
      {
        [e.target.name]: e.target.value,
        error: undefined
      },
      () => {
        const { userId } = this.state
        if (userIds.includes(userId)) {
          this.setState({
            avatarURL: users[userId].avatarURL
          })
        } else {
          this.setState({
            avatarURL: DEFAULT_AVATAR
          })
        }
      }
    )
  }

  handleSignin = e => {
    e.preventDefault()
    const { userId, password } = this.state
    userId !== undefined && password !== undefined && this.validatePassword()
      ? this.props.setAuthedUser(userId)
      : this.setState({
          error: SIGNIN_ERROR
        })
  }

  render() {
    const { users } = this.props
    const { avatarURL } = this.state
    const selectedUser = this.state.userId
    return (
      <Grid className="signin-container">
        <Row className="signin-container-row">
          <Col>
            <form onSubmit={this.handleSignin}>
              <FormGroup id="avatar">
                <Image
                  src={avatarURL}
                  responsive
                  circle={true}
                  alt={
                    selectedUser !== null && users[selectedUser]
                      ? `Avatar of ${users[selectedUser].name}`
                      : `Avatar of user`
                  }
                />
              </FormGroup>
              <FormGroup id="user">
                <ControlLabel className="signin-message-container">
                  Sign In As
                </ControlLabel>
                {this.state.error && (
                  <div>
                    <span className="error-message-container">
                      {this.state.error}
                    </span>
                  </div>
                )}
                <FormControl
                  type="text"
                  placeholder="User Id"
                  maxLength={15}
                  name="userId"
                  className="user-input"
                  onChange={this.handleChange}
                />
                <FormControl
                  type="password"
                  placeholder="Password"
                  maxLength={50}
                  name="password"
                  className="user-input"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                type="submit"
                disabled={
                  this.state.userId === null || this.state.password === null
                }
              >
                Lets Explore...!
              </Button>
              <div className="signup-message-container">
                <span>
                  New here?{' '}
                  <LinkContainer to="/signup" exact>
                    <span className="signup-link">SignUp</span>
                  </LinkContainer>{' '}
                  to try it out!
                </span>
              </div>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    userIds: Object.keys(users),
    users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAuthedUser: id => dispatch(setAuthedUser(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)

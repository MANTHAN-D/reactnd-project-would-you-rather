import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Grid,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import _ from 'lodash'
import { HmacMD5 } from 'crypto-js'

import { handleAddUser } from '../actions/users'

import './signup.css'

class SignUp extends Component {
  state = {
    id: '',
    name: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
    error: undefined
  }

  handleChange = e => {
    const { userIds } = this.props
    this.setState(
      {
        [e.target.name]: e.target.value,
        error: undefined
      },
      () => {
        const { id } = this.state
        if (userIds.includes(id)) {
          this.setState({
            error: 'User Id not available! Try again.'
          })
        }
      }
    )
  }

  handleSignup = e => {
    e.preventDefault()

    const { id, name, password, confirmPassword, avatarURL } = this.state
    const { handleSignup } = this.props

    if (!_.isEqual(password, confirmPassword)) {
      this.setState({
        error: 'Passwords do not match!'
      })
    }

    if (id && name && password && confirmPassword && avatarURL) {
      const info = {
        id,
        name,
        password: {
          words: HmacMD5(password, 'salt').words
        },
        avatarURL
      }
      handleSignup(info)
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <Grid className="signin-container">
        <Row className="signin-container-row">
          <Col>
            <form onSubmit={this.handleSignup}>
              <FormGroup id="user">
                <ControlLabel className="signup-message-container">
                  Sign-Up Form
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
                  name="id"
                  className="user-input"
                  onChange={this.handleChange}
                />
                <FormControl
                  type="text"
                  placeholder="User Name"
                  maxLength={50}
                  name="name"
                  className="user-input"
                  onChange={this.handleChange}
                />
                <FormControl
                  type="link"
                  placeholder="Avatar URL"
                  maxLength={150}
                  name="avatarURL"
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
                <FormControl
                  type="password"
                  placeholder="Confirm Password"
                  maxLength={50}
                  name="confirmPassword"
                  className="user-input"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                type="submit"
                disabled={
                  this.state.id === null ||
                  this.state.password === null ||
                  this.state.name === null ||
                  this.state.confirmPassword === null ||
                  this.state.avatarURL === null
                }
              >
                Sign Up...!
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    userIds: Object.keys(users)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSignup: info => dispatch(handleAddUser(info))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)
)

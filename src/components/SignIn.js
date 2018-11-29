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

import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {
  state = {
    user: null
  }

  handleUserSelection = e => {
    this.setState({
      user: e.target.value !== 'Choose User' ? e.target.value : null
    })
  }

  handleSignin = e => {
    e.preventDefault()
    this.state.user !== null ? this.props.setAuthedUser(this.state.user) : null
  }

  render() {
    const { userIds, users } = this.props
    const selectedUser = this.state.user
    return (
      <Grid className="signin-container">
        <Row className="signin-container-row">
          <Col>
            <form onSubmit={this.handleSignin}>
              <FormGroup id="avatar">
                <Image
                  src={
                    selectedUser !== null && users[selectedUser]
                      ? users[selectedUser].avatarURL
                      : 'https://github.com/MANTHAN-D/reactnd-project-would-you-rather/blob/master/public/avatars/john.png?raw=true'
                  }
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
                <ControlLabel>Sign In As</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="Choose user"
                  onChange={this.handleUserSelection}
                >
                  <option value={null} key={'choose-user'}>
                    Choose User
                  </option>
                  {userIds.map(userId => (
                    <option value={userId} key={userId}>
                      {users[userId].name}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
              <Button type="submit" disabled={this.state.user === null}>
                Lets Explore...!
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

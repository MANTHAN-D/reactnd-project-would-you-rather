import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { setAuthedUser } from '../actions/authedUser'

import './header.css'

class Header extends Component {
  handleLogout = e => {
    e.preventDefault()
    this.props.setAuthedUser(null)
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <LinkContainer to="/" exact>
            <Navbar.Brand className="header-brand">
              Would You Rather?
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/add">
              <NavItem className="header-item-text">New Question</NavItem>
            </LinkContainer>
            <LinkContainer to="/leaderboard">
              <NavItem className="header-item-text">Leaders' Board</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavItem>
              <Navbar.Text className="header-item-text">
                Welcome, {this.props.userName}
              </Navbar.Text>
              <Image
                src={this.props.avatarURL}
                responsive
                circle={true}
                alt={`Avatar of ${this.props.userName}`}
                className="header-avatar"
              />
            </NavItem>
            <NavItem onClick={this.handleLogout}>
              <Navbar.Text className="header-item-text">Logout</Navbar.Text>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    userName: authedUser !== null ? users[authedUser].name : 'undefined',
    avatarURL:
      authedUser !== null
        ? users[authedUser].avatarURL
        : 'https://github.com/MANTHAN-D/reactnd-project-would-you-rather/blob/master/public/avatars/john.png?raw=true'
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
)(Header)

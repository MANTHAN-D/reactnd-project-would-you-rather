import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap'

import './header.css'

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand className="header-brand">
            Would You Rather?
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem className="header-item-text">New Question</NavItem>
            <NavItem className="header-item-text">Leaders' Board </NavItem>
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
            <NavItem>
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

export default connect(mapStateToProps)(Header)

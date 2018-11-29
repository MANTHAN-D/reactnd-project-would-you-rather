import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap'

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>Would You Rather?</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>New Question</NavItem>
            <NavItem>Leaders' Board </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>
              <Navbar.Text>Welcome, {this.props.userName}</Navbar.Text>
              <Image
                src={this.props.avatarURL}
                responsive
                circle={true}
                alt={`Avatar of ${this.props.userName}`}
                className="header-avatar"
              />
            </NavItem>
            <NavItem>
              <Navbar.Text>Logout</Navbar.Text>
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

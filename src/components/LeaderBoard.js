import React from 'react'
import { connect } from 'react-redux'
import { Panel, Grid, Row, Col, Image, Label, Badge } from 'react-bootstrap'

import './leaderboard.css'

const LeaderBoard = props => {
  const { leaders } = props
  return (
    <Panel className="leader-board-container">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Leaders' Board</Panel.Title>
      </Panel.Heading>
      <Grid>
        {leaders.map((user, index) => (
          <Row className="leader-info" key={user.id}>
            <Col md={2}>
              <Badge className="rank-label">{index + 1}</Badge>
              <Image
                className="leader-glimpse-avatar"
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
                responsive
                circle={true}
              />
            </Col>
            <Col md={4}>
              <span className="username">{user.name}</span>
            </Col>
            <Col md={3}>
              <Label className="asked-label">Asked</Label>
              <Badge className="count-label">{user.questions.length}</Badge>
            </Col>
            <Col md={3}>
              <Label className="answered-label">Answered</Label>
              <Badge className="count-label">
                {Object.keys(user.answers).length}
              </Badge>
            </Col>
          </Row>
        ))}
      </Grid>
    </Panel>
  )
}

const mapStateToProp = ({ users }) => {
  return {
    leaders: Object.values(users).sort((a, b) => {
      return (
        Object.keys(b.answers).length +
        b.questions.length -
        (Object.keys(a.answers).length + a.questions.length)
      )
    })
  }
}

export default connect(mapStateToProp)(LeaderBoard)

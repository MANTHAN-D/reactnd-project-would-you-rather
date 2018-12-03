import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Image, Button, Grid, Row, Col } from 'react-bootstrap'

import './questionglimpse.css'

class QuestionGlimpse extends Component {
  render() {
    const { question, avatarURL, optionGlimpseText } = this.props
    return (
      <Panel className="question-glimpse-container">
        <Grid>
          <Row>
            <Col md={1}>
              <Image
                className="question-glimpse-avatar"
                src={avatarURL}
                alt={`Avatar of ${question.author}`}
                responsive
                circle={true}
              />
            </Col>
            <Col md={3}>
              <span className="would-you-rather">Would you Rather</span>
            </Col>
            <Col md={6}>
              <span className="options">{optionGlimpseText}</span>
            </Col>
            <Col md={2}>
              <span className="view-poll-button">
                <Button>View Poll</Button>
              </span>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
}

const mapStateToProps = ({ questions, users }, { id }) => {
  const optionGlimpseText =
    id !== null
      ? '... ' +
        questions[id].optionOne.text +
        ' | ' +
        questions[id].optionTwo.text +
        ' ...'
      : '... missing options ...'
  return {
    question: id !== null ? questions[id] : null,
    avatarURL: id !== null ? users[questions[id].author].avatarURL : null,
    optionGlimpseText
  }
}

export default connect(mapStateToProps)(QuestionGlimpse)

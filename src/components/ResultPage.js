import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Panel,
  Grid,
  Row,
  Col,
  Label,
  Badge,
  ProgressBar
} from 'react-bootstrap'

import './resultpage.css'

class ResultPage extends Component {
  render() {
    const {
      optionOne,
      optionTwo,
      votesOptionOne,
      votesOptionTwo,
      percentageOptionOne,
      percentageOptionTwo,
      answer
    } = this.props
    return (
      <Panel className="result-page-container">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Results</Panel.Title>
        </Panel.Heading>
        <Grid>
          <Row className="result-page-header">
            <Col md={12}>
              <span>Would you rather</span>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="option-container">
                <div>
                  <b>{optionOne}</b>
                  {answer === 'optionOne' && (
                    <Badge className="answer-badge">Your answer</Badge>
                  )}
                </div>
                <div>
                  <Label className="votes-label">Votes</Label>
                  <Badge className="count-label">{votesOptionOne}</Badge>
                </div>
                <div>
                  <ProgressBar
                    bsStyle={percentageOptionOne >= 50 ? 'success' : 'warning'}
                    now={percentageOptionOne}
                    label={`${percentageOptionOne}%`}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="option-container">
                <div>
                  <b>{optionTwo}</b>
                  {answer === 'optionTwo' && (
                    <Badge className="answer-badge">Your answer</Badge>
                  )}
                </div>
                <div>
                  <Label className="votes-label">Votes</Label>
                  <Badge className="count-label">{votesOptionTwo}</Badge>
                </div>
                <div>
                  <ProgressBar
                    bsStyle={percentageOptionTwo >= 50 ? 'success' : 'warning'}
                    now={percentageOptionTwo}
                    label={`${percentageOptionTwo}%`}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
}

const mapStateToProps = ({ authedUser, questions }, { id }) => {
  const votesOptionOne = questions[id].optionOne.votes.length
  const votesOptionTwo = questions[id].optionTwo.votes.length
  const percentageOptionOne = Number.parseFloat(
    (votesOptionOne * 100) / (votesOptionOne + votesOptionTwo)
  ).toPrecision(2)

  const percentageOptionTwo = 100 - percentageOptionOne

  return {
    answer: questions[id].optionOne.votes.includes(authedUser)
      ? 'optionOne'
      : 'optionTwo',
    votesOptionOne,
    votesOptionTwo,
    optionOne: questions[id].optionOne.text,
    optionTwo: questions[id].optionTwo.text,
    percentageOptionOne,
    percentageOptionTwo
  }
}

export default connect(mapStateToProps)(ResultPage)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Panel,
  Grid,
  Row,
  Col,
  Image,
  Button,
  FormGroup,
  Radio,
  Label,
  Badge
} from 'react-bootstrap'

import './answerquestion.css'

class AnswerQuestion extends Component {
  state = {
    answer: null
  }

  handleSubmit = e => {
    e.preventDefault()
    // TODO: Call action creator to set state
    //TODO: Redirect to corresponding answer page
  }

  handleSelect = e => {
    this.setState({
      answer: e.target.value
    })
  }

  render() {
    const {
      avatarURL,
      userName,
      optionOneText,
      optionTwoText,
      questionsAsked,
      questionsAnswered
    } = this.props
    return (
      <Panel className="answer-page-container">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Answer Question</Panel.Title>
        </Panel.Heading>
        <form onSubmit={this.handleSubmit}>
          <Grid>
            <Row>
              <Col md={4} className="author-details">
                <Row>
                  <Col>
                    <Image
                      src={avatarURL}
                      responsive
                      circle={true}
                      alt={`Avatar of ${userName}`}
                      className="answer-question-avatar"
                    />
                    <div className="username">Asked by {userName}</div>
                  </Col>
                </Row>
                <Row>
                  <Col className="labels-container">
                    <div>
                      <Label className="asked-label">Asked</Label>
                      <Badge className="count-label">{questionsAsked}</Badge>
                    </div>
                    <div>
                      <Label className="answered-label">Answered</Label>
                      <Badge className="count-label">{questionsAnswered}</Badge>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={8} className="question-details">
                <Row className="question-details-header">
                  <Col>
                    <div>Would you rather</div>
                  </Col>
                </Row>
                <Row className="option-container">
                  <Col>
                    <FormGroup onChange={this.handleSelect}>
                      <div>
                        <Radio name="optionsGroup" value={optionOneText}>
                          {optionOneText}
                        </Radio>
                      </div>
                      <div>
                        <Radio name="optionsGroup" value={optionTwoText}>
                          {optionTwoText}
                        </Radio>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="submit-container">
                  <Col>
                    <Button type="submit" disabled={this.state.answer === null}>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </form>
      </Panel>
    )
  }
}

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  return {
    authedUser,
    optionOneText: id !== null ? questions[id].optionOne.text : null,
    optionTwoText: id !== null ? questions[id].optionTwo.text : null,
    avatarURL: id !== null ? users[questions[id].author].avatarURL : null,
    userName: id !== null ? users[questions[id].author].name : null,
    questionsAsked:
      id !== null ? users[questions[id].author].questions.length : null,
    questionsAnswered:
      id !== null ? users[questions[id].author].answers.length : null
  }
}
export default connect(mapStateToProps)(AnswerQuestion)

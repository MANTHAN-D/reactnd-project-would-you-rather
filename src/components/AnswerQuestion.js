import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

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

import { handleSaveQuestionAnswer } from '../actions/questions'

import './answerquestion.css'

class AnswerQuestion extends Component {
  state = {
    answer: null,
    toHome: false
  }

  handleSubmit = e => {
    const { saveQuestionAnswer, authedUser, id } = this.props
    const { answer } = this.state
    e.preventDefault()
    const info = {
      authedUser,
      qid: id,
      answer
    }

    saveQuestionAnswer(info)

    this.setState(() => ({
      answer: '',
      toHome: true
    }))
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

    const { toHome } = this.state

    if (toHome === true) {
      return <Redirect to="/" />
    }

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
                        <Radio name="optionsGroup" value={'optionOne'}>
                          {optionOneText}
                        </Radio>
                      </div>
                      <div>
                        <Radio name="optionsGroup" value={'optionTwo'}>
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
      id !== null
        ? Object.keys(users[questions[id].author].answers).length
        : null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveQuestionAnswer: info => dispatch(handleSaveQuestionAnswer(info))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerQuestion)

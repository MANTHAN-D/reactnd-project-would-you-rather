import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'

import QuestionGlimpse from './QuestionGlimpse'

import './homepage.css'

class HomePage extends Component {
  render() {
    return (
      <Tabs
        defaultActiveKey={1}
        id="home-page-tabbed-view"
        className="home-page-tabbed-container"
      >
        <Tab eventKey={1} title="Un-answered Questions">
          {this.props.unansweredQuestionIds.map(questionId => (
            <QuestionGlimpse id={questionId} key={questionId} />
          ))}
        </Tab>
        <Tab eventKey={2} title="Answered Questions">
          {this.props.answeredQuestionIds.map(questionId => (
            <QuestionGlimpse id={questionId} key={questionId} />
          ))}
        </Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = ({ authedUser, users, questions }) => {
  const answeredQuestionIds =
    authedUser !== null ? Object.keys(users[authedUser].answers) : null

  const questionIds = Object.keys(questions)

  return {
    unansweredQuestionIds:
      authedUser !== null
        ? questionIds.filter(
            questionId => !answeredQuestionIds.includes(questionId)
          )
        : null,
    answeredQuestionIds:
      authedUser !== null
        ? questionIds.filter(questionId =>
            answeredQuestionIds.includes(questionId)
          )
        : null
  }
}
export default connect(mapStateToProps)(HomePage)

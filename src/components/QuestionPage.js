import React, { Component } from 'react'
import { connect } from 'react-redux'

import ResultPage from './ResultPage'
import AnswerQuestion from './AnswerQuestion'

class QuestionPage extends Component {
  render() {
    const { question, isAnswered, id } = this.props
    return question !== null ? (
      isAnswered === true ? (
        <ResultPage id={id} />
      ) : (
        <AnswerQuestion id={id} />
      )
    ) : null
  }
}

const mapStateToProps = ({ questions, authedUser }, { id }) => {
  const isAnswered =
    id !== null &&
    (questions[id].optionOne.votes.includes(authedUser) ||
      questions[id].optionTwo.votes.includes(authedUser))
  return {
    question: id !== null ? questions[id] : null,
    isAnswered
  }
}

export default connect(mapStateToProps)(QuestionPage)

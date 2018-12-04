import React, { Component } from 'react'
import { connect } from 'react-redux'

import ResultPage from './ResultPage'
import AnswerQuestion from './AnswerQuestion'
import NotFound from './Error'

class QuestionPage extends Component {
  render() {
    const { question, isAnswered, id } = this.props
    return question !== undefined ? (
      isAnswered === true ? (
        <ResultPage id={id} />
      ) : (
        <AnswerQuestion id={id} />
      )
    ) : (
      <NotFound />
    )
  }
}

const mapStateToProps = ({ questions, authedUser }, { id }) => {
  const isAnswered =
    id !== null &&
    questions[id] !== undefined &&
    (questions[id].optionOne.votes.includes(authedUser) ||
      questions[id].optionTwo.votes.includes(authedUser))
  return {
    question: id !== null ? questions[id] : undefined,
    isAnswered
  }
}

export default connect(mapStateToProps)(QuestionPage)

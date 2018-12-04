import React from 'react'
import { connect } from 'react-redux'

import ResultPage from './ResultPage'
import AnswerQuestion from './AnswerQuestion'
import NotFound from './Error'

const QuestionPage = props => {
  const { question, isAnswered, id } = props
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

const mapStateToProps = ({ questions, authedUser }, props) => {
  const { id } = props.match.params
  const isAnswered =
    id !== null &&
    questions[id] !== undefined &&
    (questions[id].optionOne.votes.includes(authedUser) ||
      questions[id].optionTwo.votes.includes(authedUser))
  return {
    question: id !== null ? questions[id] : undefined,
    isAnswered,
    id
  }
}

export default connect(mapStateToProps)(QuestionPage)

import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export const receiveQuestions = questions => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

const addQuestion = question => {
  return {
    type: ADD_QUESTION,
    question
  }
}

export const handleAddQuestion = question => {
  return dispatch => {
    dispatch(showLoading())
    return saveQuestion(question)
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

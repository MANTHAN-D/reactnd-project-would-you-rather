import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { updateUsersOnAnswer, addQuestionToUser } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

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
      .then(question => {
        dispatch(addQuestion(question))
        const info = {
          id: question.id,
          author: question.author
        }
        return dispatch(addQuestionToUser(info))
      })
      .then(() => dispatch(hideLoading()))
  }
}

const saveAnswer = info => {
  return {
    type: SAVE_ANSWER,
    info
  }
}

export const handleSaveQuestionAnswer = info => {
  return dispatch => {
    dispatch(showLoading())
    dispatch(saveAnswer(info))
    dispatch(updateUsersOnAnswer(info))
    return saveQuestionAnswer(info).then(() => dispatch(hideLoading()))
  }
}

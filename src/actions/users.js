import { saveUser } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USERS_ON_ANSWER = 'UPDATE_USERS_ON_ANSWER'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'
export const ADD_USER = 'ADD_USER'

export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export const updateUsersOnAnswer = info => {
  return {
    type: UPDATE_USERS_ON_ANSWER,
    info
  }
}

export const addQuestionToUser = info => {
  return {
    type: ADD_QUESTION_TO_USER,
    info
  }
}

export const addUser = info => {
  return {
    type: ADD_USER,
    info
  }
}

export const handleAddUser = info => {
  return dispatch => {
    dispatch(showLoading())
    dispatch(addUser(info))
    return saveUser(info).then(() => dispatch(hideLoading()))
  }
}

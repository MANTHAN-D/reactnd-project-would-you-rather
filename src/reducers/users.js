import {
  RECEIVE_USERS,
  UPDATE_USERS_ON_ANSWER,
  ADD_USER,
  ADD_QUESTION_TO_USER
} from '../actions/users'

const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case UPDATE_USERS_ON_ANSWER:
      const { qid, answer, authedUser } = action.info
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case ADD_USER:
      const { id, name, password, avatarURL } = action.info
      return {
        ...state,
        [id]: {
          id,
          name,
          password,
          avatarURL,
          answers: {},
          questions: []
        }
      }
    case ADD_QUESTION_TO_USER:
      const { author } = action.info
      const questionId = action.info.id
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([questionId])
        }
      }
    default:
      return state
  }
}

export default users

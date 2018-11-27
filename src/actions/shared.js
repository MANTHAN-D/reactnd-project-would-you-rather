import { _getQuestions, _getUsers } from '../utils/_DATA'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'

export const handleInitialData = () => {
  _getQuestions().then(({ questions }) => {
    dispatch(receiveQuestions(questions))
  })

  _getUsers().then(({ users }) => {
    dispatch(receiveUsers(users))
  })
}

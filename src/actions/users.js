export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USERS_ON_ANSWER = 'UPDATE_USERS_ON_ANSWER'

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

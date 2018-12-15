'use strict'
export default (
  state = { value: [], loading: false, error: false },
  action
) => {
  switch (action.type) {
    case 'LOADING':
      state = { ...state, loading: true, error: false }
      return state
    case 'USER_STATUS':
      state = {
        ...state,
        status:  action.status,
        userID:  action.userID,
        loading: false,
        error: false
      }
      return state
    case 'USER_LOGIN_REDIRECT':
      state = {
        ...state,
        redirect:true,
        loading: false,
        error: false
      }
      return state
    case 'SETTINGS_FETCHED':
      state = {
        ...state,
        settings: { data: action.settings },
        loading: false,
        error: false
      }
      return state
    case 'UPDATING_SETTINGS':
      state = {
        ...state,
        loading: true,
        error: false
      }
      return state
    case 'UPDATED_SETTINGS':
        state = {
          ...state,
          settings: { data: action.newSettings },
          loading: false,
          error: false
        }
        return state
    case 'USER_LOGOUT':
      state = { ...state, loading: false, error: false, value: [] }
      return state
    case 'USER_ERROR':
      state = { ...state, loading: false, error: action }
      return state
    default:
      return state
  }
}

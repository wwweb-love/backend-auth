import {
  AUTH_CLEAR_ERROR,
  AUTH_FAILURE,
  AUTH_INITIALIZED,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_RESTORE,
  AUTH_SUCCESS,
} from '../actions/authActions'

const initialState = {
  user: null,
  isAuthenticated: false,
  initialized: false,
  loading: false,
  error: null,
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true, error: null }
    case AUTH_SUCCESS:
    case AUTH_RESTORE:
      return {
        ...state,
        loading: false,
        initialized: true,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      }
    case AUTH_FAILURE:
      return { ...state, loading: false, initialized: true, error: action.payload }
    case AUTH_INITIALIZED:
      return { ...state, initialized: true, loading: false }
    case AUTH_CLEAR_ERROR:
      return { ...state, error: null }
    case AUTH_LOGOUT:
      return { ...initialState, initialized: true }
    default:
      return state
  }
}

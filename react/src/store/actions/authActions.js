export const AUTH_REQUEST = 'auth/request'
export const AUTH_SUCCESS = 'auth/success'
export const AUTH_FAILURE = 'auth/failure'
export const AUTH_LOGOUT = 'auth/logout'
export const AUTH_RESTORE = 'auth/restore'
export const AUTH_INITIALIZED = 'auth/initialized'
export const AUTH_CLEAR_ERROR = 'auth/clearError'

export const authRequest = () => ({ type: AUTH_REQUEST })
export const authSuccess = (user) => ({ type: AUTH_SUCCESS, payload: user })
export const authFailure = (message) => ({ type: AUTH_FAILURE, payload: message })
export const authLogout = () => ({ type: AUTH_LOGOUT })
export const authRestore = (user) => ({ type: AUTH_RESTORE, payload: user })
export const authInitialized = () => ({ type: AUTH_INITIALIZED })
export const authClearError = () => ({ type: AUTH_CLEAR_ERROR })

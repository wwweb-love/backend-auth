import {
  fetchCurrentUser,
  loginRequest,
  logoutRequest,
  registerRequest,
} from '../../api/authApi'
import {
  authClearError,
  authFailure,
  authInitialized,
  authLogout,
  authRequest,
  authRestore,
  authSuccess,
} from './authActions'

export const restoreSession = () => async (dispatch) => {
  try {
    const user = await fetchCurrentUser()
    if (user) {
      dispatch(authRestore(user))
      return
    }
  } catch {
    // Нет валидной cookie — гость
  }
  dispatch(authInitialized())
}

export const loginUser = (login, password) => async (dispatch) => {
  dispatch(authRequest())
  try {
    const user = await loginRequest(login, password)
    dispatch(authSuccess(user))
  } catch (error) {
    dispatch(authFailure(error.message))
  }
}

export const registerUser = (form) => async (dispatch) => {
  dispatch(authRequest())
  try {
    const user = await registerRequest(form)
    dispatch(authSuccess(user))
  } catch (error) {
    dispatch(authFailure(error.message))
  }
}

export const logoutUser = () => async (dispatch) => {
  try {
    await logoutRequest()
  } catch {
    // Сессию на клиенте сбрасываем в любом случае
  }
  dispatch(authLogout())
}

export { authClearError }

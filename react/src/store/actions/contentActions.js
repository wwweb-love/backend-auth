export const CONTENT_REQUEST = 'content/request'
export const CONTENT_SUCCESS = 'content/success'
export const CONTENT_FAILURE = 'content/failure'

export const contentRequest = (key) => ({ type: CONTENT_REQUEST, payload: key })
export const contentSuccess = (key, data) => ({ type: CONTENT_SUCCESS, payload: { key, data } })
export const contentFailure = (key, message) => ({
  type: CONTENT_FAILURE,
  payload: { key, message },
})

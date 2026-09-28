export const NEWS_REQUEST = 'news/request'
export const NEWS_SUCCESS = 'news/success'
export const NEWS_FAILURE = 'news/failure'

export const newsRequest = () => ({ type: NEWS_REQUEST })
export const newsSuccess = (payload) => ({ type: NEWS_SUCCESS, payload })
export const newsFailure = (message) => ({ type: NEWS_FAILURE, payload: message })

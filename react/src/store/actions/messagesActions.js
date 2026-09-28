export const MESSAGES_REQUEST = 'messages/request'
export const MESSAGES_SUCCESS = 'messages/success'
export const MESSAGES_FAILURE = 'messages/failure'
export const MESSAGES_MARK_READ = 'messages/markRead'

export const messagesRequest = () => ({ type: MESSAGES_REQUEST })
export const messagesSuccess = (payload) => ({ type: MESSAGES_SUCCESS, payload })
export const messagesFailure = (message) => ({ type: MESSAGES_FAILURE, payload: message })
export const messagesMarkRead = (id) => ({ type: MESSAGES_MARK_READ, payload: id })

export const SCHEDULE_REQUEST = 'schedule/request'
export const SCHEDULE_SUCCESS = 'schedule/success'
export const SCHEDULE_FAILURE = 'schedule/failure'

export const scheduleRequest = () => ({ type: SCHEDULE_REQUEST })
export const scheduleSuccess = (payload) => ({ type: SCHEDULE_SUCCESS, payload })
export const scheduleFailure = (message) => ({ type: SCHEDULE_FAILURE, payload: message })

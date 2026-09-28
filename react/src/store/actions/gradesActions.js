export const GRADES_REQUEST = 'grades/request'
export const GRADES_SUCCESS = 'grades/success'
export const GRADES_FAILURE = 'grades/failure'

export const gradesRequest = () => ({ type: GRADES_REQUEST })
export const gradesSuccess = (payload) => ({ type: GRADES_SUCCESS, payload })
export const gradesFailure = (message) => ({ type: GRADES_FAILURE, payload: message })

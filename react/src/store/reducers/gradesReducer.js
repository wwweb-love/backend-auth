import { GRADES_FAILURE, GRADES_REQUEST, GRADES_SUCCESS } from '../actions/gradesActions'

const initialState = {
  records: [],
  loading: true,
  error: null,
}

export function gradesReducer(state = initialState, action) {
  switch (action.type) {
    case GRADES_REQUEST:
      return { ...state, loading: true, error: null }
    case GRADES_SUCCESS:
      return { ...state, loading: false, records: action.payload }
    case GRADES_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

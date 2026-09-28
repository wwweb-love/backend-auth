import { SCHEDULE_FAILURE, SCHEDULE_REQUEST, SCHEDULE_SUCCESS } from '../actions/scheduleActions'

const initialState = {
  weekLabel: '',
  pairs: [],
  lessons: [],
  loading: true,
  error: null,
}

export function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case SCHEDULE_REQUEST:
      return { ...state, loading: true, error: null }
    case SCHEDULE_SUCCESS:
      return { ...state, loading: false, ...action.payload }
    case SCHEDULE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

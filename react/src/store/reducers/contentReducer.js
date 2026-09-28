import { CONTENT_FAILURE, CONTENT_REQUEST, CONTENT_SUCCESS } from '../actions/contentActions'

const initialState = {
  library: [],
  contacts: null,
  loading: {},
  error: {},
}

export function contentReducer(state = initialState, action) {
  switch (action.type) {
    case CONTENT_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, [action.payload]: true },
        error: { ...state.error, [action.payload]: null },
      }
    case CONTENT_SUCCESS:
      return {
        ...state,
        [action.payload.key]: action.payload.data,
        loading: { ...state.loading, [action.payload.key]: false },
      }
    case CONTENT_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: false },
        error: { ...state.error, [action.payload.key]: action.payload.message },
      }
    default:
      return state
  }
}

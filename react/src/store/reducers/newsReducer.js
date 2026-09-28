import { NEWS_FAILURE, NEWS_REQUEST, NEWS_SUCCESS } from '../actions/newsActions'

const initialState = {
  items: [],
  loading: true,
  error: null,
}

export function newsReducer(state = initialState, action) {
  switch (action.type) {
    case NEWS_REQUEST:
      return { ...state, loading: true, error: null }
    case NEWS_SUCCESS:
      return { ...state, loading: false, items: action.payload }
    case NEWS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

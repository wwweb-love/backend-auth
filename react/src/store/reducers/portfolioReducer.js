import {
  PORTFOLIO_ADD,
  PORTFOLIO_FAILURE,
  PORTFOLIO_REMOVE,
  PORTFOLIO_REQUEST,
  PORTFOLIO_SUCCESS,
} from '../actions/portfolioActions'

const initialState = {
  items: [],
  loading: true,
  error: null,
}

export function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case PORTFOLIO_REQUEST:
      return { ...state, loading: true, error: null }
    case PORTFOLIO_SUCCESS:
      return { ...state, loading: false, items: action.payload }
    case PORTFOLIO_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case PORTFOLIO_ADD:
      return { ...state, items: [...state.items, action.payload] }
    case PORTFOLIO_REMOVE:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) }
    default:
      return state
  }
}

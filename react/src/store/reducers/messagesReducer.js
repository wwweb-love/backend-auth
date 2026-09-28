import {
  MESSAGES_FAILURE,
  MESSAGES_MARK_READ,
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
} from '../actions/messagesActions'

const initialState = {
  items: [],
  loading: true,
  error: null,
}

export function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGES_REQUEST:
      return { ...state, loading: true, error: null }
    case MESSAGES_SUCCESS:
      return { ...state, loading: false, items: action.payload }
    case MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case MESSAGES_MARK_READ:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, read: true } : item,
        ),
      }
    default:
      return state
  }
}

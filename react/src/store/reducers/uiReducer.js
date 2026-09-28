import { UI_SET_SIDEBAR, UI_TOGGLE_SIDEBAR } from '../actions/uiActions'

const initialState = {
  sidebarOpen: false,
}

export function uiReducer(state = initialState, action) {
  switch (action.type) {
    case UI_TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case UI_SET_SIDEBAR:
      return { ...state, sidebarOpen: action.payload }
    default:
      return state
  }
}

export const UI_TOGGLE_SIDEBAR = 'ui/toggleSidebar'
export const UI_SET_SIDEBAR = 'ui/setSidebar'

export const toggleSidebar = () => ({ type: UI_TOGGLE_SIDEBAR })
export const setSidebar = (open) => ({ type: UI_SET_SIDEBAR, payload: open })

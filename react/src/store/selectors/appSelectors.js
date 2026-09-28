import { createSelector } from '@reduxjs/toolkit'

export const selectNews = (state) => state.news.items
export const selectNewsLoading = (state) => state.news.loading

export const selectMessages = (state) => state.messages.items
export const selectUnreadCount = createSelector(
  [selectMessages],
  (items) => items.filter((item) => !item.read).length,
)

export const selectLibrary = (state) => state.content.library
export const selectContacts = (state) => state.content.contacts
export const selectSidebarOpen = (state) => state.ui.sidebarOpen

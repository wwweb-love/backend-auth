export const selectAuth = (state) => state.auth
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthInitialized = (state) => state.auth.initialized
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error

export const selectFullName = (state) => {
  const user = state.auth.user
  if (!user) return ''
  return `${user.lastName} ${user.firstName} ${user.patronymic || ''}`.trim()
}

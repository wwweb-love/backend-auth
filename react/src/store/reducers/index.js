import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './authReducer'
import { contentReducer } from './contentReducer'
import { gradesReducer } from './gradesReducer'
import { messagesReducer } from './messagesReducer'
import { newsReducer } from './newsReducer'
import { portfolioReducer } from './portfolioReducer'
import { scheduleReducer } from './scheduleReducer'
import { uiReducer } from './uiReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  schedule: scheduleReducer,
  grades: gradesReducer,
  portfolio: portfolioReducer,
  news: newsReducer,
  messages: messagesReducer,
  content: contentReducer,
  ui: uiReducer,
})

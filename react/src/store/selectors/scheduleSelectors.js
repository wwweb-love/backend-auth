import { createSelector } from '@reduxjs/toolkit'

export const selectSchedule = (state) => state.schedule
export const selectLessons = (state) => state.schedule.lessons
export const selectPairs = (state) => state.schedule.pairs

export const selectLessonsByDay = createSelector([selectLessons], (lessons) => {
  const days = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
  lessons.forEach((lesson) => {
    if (days[lesson.weekday]) {
      days[lesson.weekday].push(lesson)
    }
  })
  Object.values(days).forEach((list) => list.sort((a, b) => a.pair - b.pair))
  return days
})

export const selectTodayLessons = createSelector([selectLessons], (lessons) => {
  const weekday = new Date().getDay()
  return lessons.filter((lesson) => lesson.weekday === weekday).sort((a, b) => a.pair - b.pair)
})

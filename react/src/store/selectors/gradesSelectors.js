import { createSelector } from '@reduxjs/toolkit'

export const selectGrades = (state) => state.grades
export const selectGradeRecords = (state) => state.grades.records

export const selectGradesBySubject = createSelector([selectGradeRecords], (records) => {
  const map = {}
  records.forEach((item) => {
    if (!map[item.subject]) {
      map[item.subject] = { subject: item.subject, marks: [], teacher: item.teacher }
    }
    map[item.subject].marks.push(item)
  })
  return Object.values(map).map((group) => {
    const numeric = group.marks.map((item) => Number(item.mark)).filter((mark) => !Number.isNaN(mark))
    const average = numeric.length
      ? (numeric.reduce((sum, mark) => sum + mark, 0) / numeric.length).toFixed(2)
      : '—'
    return { ...group, average }
  })
})

export const selectAverageMark = createSelector([selectGradeRecords], (records) => {
  const numeric = records.map((item) => Number(item.mark)).filter((mark) => !Number.isNaN(mark))
  if (!numeric.length) return '—'
  return (numeric.reduce((sum, mark) => sum + mark, 0) / numeric.length).toFixed(2)
})

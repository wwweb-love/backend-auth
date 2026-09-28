import { fetchJson } from '../../api/fetchData'
import { selectCurrentUser } from '../selectors/authSelectors'
import { gradesFailure, gradesRequest, gradesSuccess } from './gradesActions'

export const loadGrades = () => async (dispatch, getState) => {
  dispatch(gradesRequest())
  try {
    const data = await fetchJson('/db_data/grades.json')
    const user = selectCurrentUser(getState())
    const records = data.records.filter((item) => item.studentId === user?.id)
    dispatch(gradesSuccess(records))
  } catch (error) {
    dispatch(gradesFailure(error.message))
  }
}

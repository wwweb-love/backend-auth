import { fetchJson } from '../../api/fetchData'
import { selectCurrentUser } from '../selectors/authSelectors'
import { scheduleFailure, scheduleRequest, scheduleSuccess } from './scheduleActions'

export const loadSchedule = () => async (dispatch, getState) => {
  dispatch(scheduleRequest())
  try {
    const data = await fetchJson('/db_data/schedule.json')
    const user = selectCurrentUser(getState())
    const lessons = data.lessons.filter((lesson) => lesson.group === user?.group)
    dispatch(
      scheduleSuccess({
        weekLabel: data.weekLabel,
        pairs: data.pairs,
        lessons,
      }),
    )
  } catch (error) {
    dispatch(scheduleFailure(error.message))
  }
}

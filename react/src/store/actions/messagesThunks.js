import { fetchJson } from '../../api/fetchData'
import { selectCurrentUser } from '../selectors/authSelectors'
import { messagesFailure, messagesRequest, messagesSuccess } from './messagesActions'

export const loadMessages = () => async (dispatch, getState) => {
  dispatch(messagesRequest())
  try {
    const data = await fetchJson('/db_data/messages.json')
    const user = selectCurrentUser(getState())
    dispatch(messagesSuccess(data.items.filter((item) => item.studentId === user?.id)))
  } catch (error) {
    dispatch(messagesFailure(error.message))
  }
}

import { fetchJson } from '../../api/fetchData'
import { contentFailure, contentRequest, contentSuccess } from './contentActions'

export const loadLibrary = () => async (dispatch) => {
  dispatch(contentRequest('library'))
  try {
    const data = await fetchJson('/db_data/library.json')
    dispatch(contentSuccess('library', data.resources))
  } catch (error) {
    dispatch(contentFailure('library', error.message))
  }
}

export const loadContacts = () => async (dispatch) => {
  dispatch(contentRequest('contacts'))
  try {
    const data = await fetchJson('/db_data/contacts.json')
    dispatch(contentSuccess('contacts', data))
  } catch (error) {
    dispatch(contentFailure('contacts', error.message))
  }
}

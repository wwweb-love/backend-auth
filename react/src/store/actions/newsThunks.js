import { fetchJson } from '../../api/fetchData'
import { newsFailure, newsRequest, newsSuccess } from './newsActions'

export const loadNews = () => async (dispatch) => {
  dispatch(newsRequest())
  try {
    const data = await fetchJson('/db_data/news.json')
    dispatch(newsSuccess(data.items))
  } catch (error) {
    dispatch(newsFailure(error.message))
  }
}

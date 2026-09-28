import { fetchJson, loadUploadedPortfolio, saveUploadedPortfolio } from '../../api/fetchData'
import { selectCurrentUser } from '../selectors/authSelectors'
import {
  portfolioAdd,
  portfolioFailure,
  portfolioRemove,
  portfolioRequest,
  portfolioSuccess,
} from './portfolioActions'

export const loadPortfolio = () => async (dispatch, getState) => {
  dispatch(portfolioRequest())
  try {
    const data = await fetchJson('/db_data/portfolio.json')
    const user = selectCurrentUser(getState())
    const uploaded = loadUploadedPortfolio().filter((item) => item.studentId === user?.id)
    const base = data.items.filter((item) => item.studentId === user?.id)
    dispatch(portfolioSuccess([...base, ...uploaded]))
  } catch (error) {
    dispatch(portfolioFailure(error.message))
  }
}

export const uploadPortfolioFile = (form, file) => async (dispatch, getState) => {
  const user = selectCurrentUser(getState())
  const dataUrl = await readFile(file)
  const item = {
    id: `local-${Date.now()}`,
    studentId: user.id,
    title: form.title.trim() || file.name,
    category: form.category,
    description: form.description.trim(),
    fileName: file.name,
    fileType: file.type || 'application/octet-stream',
    sizeKb: Math.round(file.size / 1024),
    uploadedAt: new Date().toISOString().slice(0, 10),
    dataUrl,
    local: true,
  }
  const stored = loadUploadedPortfolio()
  stored.push(item)
  saveUploadedPortfolio(stored)
  dispatch(portfolioAdd(item))
}

export const removePortfolioFile = (id) => (dispatch) => {
  const stored = loadUploadedPortfolio().filter((item) => item.id !== id)
  saveUploadedPortfolio(stored)
  dispatch(portfolioRemove(id))
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'))
    reader.readAsDataURL(file)
  })
}

const PORTFOLIO_KEY = 'augs_portfolio_uploads'

export async function fetchJson(path) {
  const response = await fetch(path)
  if (!response.ok) {
    throw new Error(`Не удалось загрузить данные (${path})`)
  }
  return response.json()
}

export function loadUploadedPortfolio() {
  try {
    return JSON.parse(localStorage.getItem(PORTFOLIO_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveUploadedPortfolio(items) {
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(items))
}

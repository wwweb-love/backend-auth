export const PORTFOLIO_REQUEST = 'portfolio/request'
export const PORTFOLIO_SUCCESS = 'portfolio/success'
export const PORTFOLIO_FAILURE = 'portfolio/failure'
export const PORTFOLIO_ADD = 'portfolio/add'
export const PORTFOLIO_REMOVE = 'portfolio/remove'

export const portfolioRequest = () => ({ type: PORTFOLIO_REQUEST })
export const portfolioSuccess = (payload) => ({ type: PORTFOLIO_SUCCESS, payload })
export const portfolioFailure = (message) => ({ type: PORTFOLIO_FAILURE, payload: message })
export const portfolioAdd = (item) => ({ type: PORTFOLIO_ADD, payload: item })
export const portfolioRemove = (id) => ({ type: PORTFOLIO_REMOVE, payload: id })

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authClearError, loginUser } from '../store/actions/authThunks'
import { selectAuthError, selectAuthLoading } from '../store/selectors/authSelectors'

export function LoginPage() {
  const dispatch = useDispatch()
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(authClearError())
  }, [dispatch])

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser(login, password))
  }

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <img src="/logo.svg" alt="" width="88" height="88" />
        <p className="brand-kicker">Санкт-Петербургское государственное бюджетное профессиональное образовательное учреждение</p>
        <h1>«Академия управления городской средой, градостроительства и печати»</h1>
        <p className="auth-tagline">Качественное среднее профессиональное образование</p>
      </div>
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Вход в личный кабинет</h2>
        {error ? <p className="alert error">{error}</p> : null}
        <label>
          Логин
          <input value={login} onChange={(e) => setLogin(e.target.value)} autoComplete="username" required />
        </label>
        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Вход…' : 'Войти'}
        </button>
        <div className="auth-links">
          <Link to="/register">Регистрация</Link>
        </div>
      </form>
    </div>
  )
}

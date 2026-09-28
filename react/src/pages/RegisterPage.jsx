import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authClearError, registerUser } from '../store/actions/authThunks'
import { selectAuthError, selectAuthLoading } from '../store/selectors/authSelectors'

const initial = {
  snils: '',
  login: '',
  email: '',
  password: '',
}

export function RegisterPage() {
  const dispatch = useDispatch()
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const [form, setForm] = useState(initial)

  useEffect(() => {
    dispatch(authClearError())
  }, [dispatch])

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(registerUser(form))
  }

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <img src="/logo.svg" alt="" width="72" height="72" />
        <h1>Регистрация студента</h1>
      </div>
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Активировать аккаунт</h2>
        <p className="hint">
          Регистрация доступна только студентам, уже внесённым в базу. Укажите СНИЛС, логин, email и пароль.
        </p>
        {error ? <p className="alert error">{error}</p> : null}
        <label>
          СНИЛС
          <input name="snils" value={form.snils} onChange={onChange} placeholder="000-000-000 00" required />
        </label>
        <label>
          Логин
          <input name="login" value={form.login} onChange={onChange} autoComplete="username" required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={onChange} autoComplete="email" required />
        </label>
        <label>
          Пароль
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Сохранение…' : 'Зарегистрироваться'}
        </button>
        <div className="auth-links">
          <Link to="/login">Уже есть аккаунт</Link>
        </div>
      </form>
    </div>
  )
}

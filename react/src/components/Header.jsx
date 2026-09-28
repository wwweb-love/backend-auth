import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/actions/authThunks'
import { toggleSidebar } from '../store/actions/uiActions'
import { selectCurrentUser } from '../store/selectors/authSelectors'

export function Header() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)

  return (
    <header className="app-header">
      <button className="icon-btn menu-btn" type="button" onClick={() => dispatch(toggleSidebar())}>
        Меню
      </button>
      <div className="brand">
        <img src="/logo.svg" alt="" width="42" height="42" />
        <div>
          <p className="brand-kicker">СПб ГБПОУ «АУГСГиП»</p>
          <h1>Личный кабинет студента</h1>
        </div>
      </div>
      <div className="header-actions">
        <span className="header-email">{user?.email || user?.login}</span>
        <button className="btn btn-ghost" type="button" onClick={() => dispatch(logoutUser())}>
          Выйти
        </button>
      </div>
    </header>
  )
}

import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setSidebar } from '../store/actions/uiActions'
import { selectCurrentUser, selectFullName } from '../store/selectors/authSelectors'
import { selectUnreadCount } from '../store/selectors/appSelectors'

const links = [
  { to: '/', label: 'Расписание' },
  { to: '/grades', label: 'Успеваемость' },
  { to: '/portfolio', label: 'Портфолио' },
  { to: '/messages', label: 'Сообщения' },
  { to: '/news', label: 'Новости' },
  { to: '/library', label: 'Библиотека' },
  { to: '/profile', label: 'Профиль' },
  { to: '/contacts', label: 'Контакты' },
]

export function Sidebar() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const fullName = useSelector(selectFullName)
  const unread = useSelector(selectUnreadCount)

  return (
    <aside className="sidebar">
      <div className="sidebar-user">
        <div className="avatar">{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
        <div>
          <p className="sidebar-name">{fullName}</p>
          <p className="sidebar-meta">
            {user?.group || user?.login}
          </p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
            onClick={() => dispatch(setSidebar(false))}
          >
            {link.label}
            {link.to === '/messages' && unread > 0 ? <span className="badge">{unread}</span> : null}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

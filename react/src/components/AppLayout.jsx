import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { setSidebar } from '../store/actions/uiActions'
import { selectSidebarOpen } from '../store/selectors/appSelectors'

export function AppLayout() {
  const dispatch = useDispatch()
  const sidebarOpen = useSelector(selectSidebarOpen)

  return (
    <div className={`app-shell${sidebarOpen ? ' sidebar-open' : ''}`}>
      <Header />
      <div className="app-body">
        <Sidebar />
        {sidebarOpen ? (
          <button className="backdrop" type="button" aria-label="Закрыть меню" onClick={() => dispatch(setSidebar(false))} />
        ) : null}
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

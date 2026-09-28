import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { GuestRoute, ProtectedRoute } from './components/ProtectedRoute'
import { ContactsPage } from './pages/ContactsPage'
import { GradesPage } from './pages/GradesPage'
import { LibraryPage } from './pages/LibraryPage'
import { LoginPage } from './pages/LoginPage'
import { MessagesPage } from './pages/MessagesPage'
import { NewsPage } from './pages/NewsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { ProfilePage } from './pages/ProfilePage'
import { RegisterPage } from './pages/RegisterPage'
import { SchedulePage } from './pages/SchedulePage'
import { loadMessages } from './store/actions/messagesThunks'
import { loadNews } from './store/actions/newsThunks'

function CabinetData() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMessages())
    dispatch(loadNews())
  }, [dispatch])
  return <AppLayout />
}

export default function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<CabinetData />}>
          <Route path="/" element={<SchedulePage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Route>
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

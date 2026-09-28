import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../store/selectors/authSelectors'

function Row({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value || '—'}</dd>
    </div>
  )
}

export function ProfilePage() {
  const user = useSelector(selectCurrentUser)

  return (
    <section>
      <div className="page-head">
        <div>
          <p className="eyebrow">Профиль</p>
          <h2>
            {user?.lastName} {user?.firstName} {user?.patronymic}
          </h2>
        </div>
      </div>

      <div className="profile-grid">
        <article className="panel">
          <h3>Учётные данные</h3>
          <dl className="info-list">
            <Row label="Логин" value={user?.login} />
            <Row label="Email" value={user?.email} />
            <Row label="СНИЛС" value={user?.snils} />
            <Row label="Группа" value={user?.group} />
            <Row label="Специальность" value={user?.specialty} />
          </dl>
        </article>
      </div>
    </section>
  )
}

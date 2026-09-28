import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="panel">
      <h2>Страница не найдена</h2>
      <p>Проверьте адрес или вернитесь на главную.</p>
      <Link className="btn btn-primary" to="/">
        На расписание
      </Link>
    </section>
  )
}

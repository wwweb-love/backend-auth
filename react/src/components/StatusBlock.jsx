export function StatusBlock({ loading, error, children, empty, isEmpty }) {
  if (loading) {
    return <p className="status">Загрузка данных…</p>
  }
  if (error) {
    return <p className="status error">{error}</p>
  }
  if (isEmpty) {
    return <p className="status">{empty}</p>
  }
  return children
}

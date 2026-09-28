import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBlock } from '../components/StatusBlock'
import { loadGrades } from '../store/actions/gradesThunks'
import { selectAverageMark, selectGradeRecords, selectGrades, selectGradesBySubject } from '../store/selectors/gradesSelectors'

export function GradesPage() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectGrades)
  const groups = useSelector(selectGradesBySubject)
  const records = useSelector(selectGradeRecords)
  const average = useSelector(selectAverageMark)

  useEffect(() => {
    dispatch(loadGrades())
  }, [dispatch])

  return (
    <section>
      <div className="page-head">
        <div>
          <p className="eyebrow">Успеваемость</p>
          <h2>Текущие оценки</h2>
        </div>
        <div className="stat-card compact">
          <span>Средний балл</span>
          <strong>{average}</strong>
        </div>
      </div>

      <StatusBlock loading={loading} error={error} isEmpty={!groups.length} empty="Оценок пока нет">
        <div className="subject-grid">
          {groups.map((group) => (
            <article key={group.subject} className="panel">
              <header className="panel-head">
                <div>
                  <h3>{group.subject}</h3>
                  <p className="muted">{group.teacher}</p>
                </div>
                <strong className="avg">{group.average}</strong>
              </header>
              <div className="marks">
                {group.marks.map((item) => (
                  <span key={item.id} className={`mark mark-${item.mark}`} title={`${item.type} · ${item.date}`}>
                    {item.mark}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="panel">
          <h3>Журнал</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Дисциплина</th>
                  <th>Вид</th>
                  <th>Оценка</th>
                  <th>Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.subject}</td>
                    <td>{item.type}</td>
                    <td>{item.mark}</td>
                    <td>{item.comment || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </StatusBlock>
    </section>
  )
}

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBlock } from '../components/StatusBlock'
import { loadSchedule } from '../store/actions/scheduleThunks'
import { selectCurrentUser } from '../store/selectors/authSelectors'
import { selectLessonsByDay, selectPairs, selectSchedule, selectTodayLessons } from '../store/selectors/scheduleSelectors'

const DAY_NAMES = {
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
}

function pairTime(pairs, number) {
  const pair = pairs.find((item) => item.number === number)
  return pair ? `${pair.start}–${pair.end}` : `пара ${number}`
}

export function SchedulePage() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const { weekLabel, loading, error } = useSelector(selectSchedule)
  const pairs = useSelector(selectPairs)
  const byDay = useSelector(selectLessonsByDay)
  const today = useSelector(selectTodayLessons)
  const weekday = new Date().getDay()

  useEffect(() => {
    dispatch(loadSchedule())
  }, [dispatch])

  return (
    <section>
      <div className="page-head">
        <div>
          <p className="eyebrow">Главная</p>
          <h2>Расписание занятий</h2>
          <p className="muted">
            Группа {user?.group || '—'} · {weekLabel}
          </p>
        </div>
      </div>

      <div className="cards-row">
        <article className="stat-card">
          <span>Сегодня</span>
          <strong>{today.length || 'вых.'}</strong>
          <p>{today.length ? `${today.length} пар` : 'занятий нет'}</p>
        </article>
        <article className="stat-card">
          <span>Специальность</span>
          <strong className="small">{user?.specialty}</strong>
        </article>
        <article className="stat-card">
          <span>Логин</span>
          <strong className="small">{user?.login}</strong>
        </article>
      </div>

      {today.length ? (
        <div className="panel">
          <h3>Пары на сегодня</h3>
          <ul className="lesson-list">
            {today.map((lesson) => (
              <li key={lesson.id}>
                <span className="pair">{lesson.pair}</span>
                <div>
                  <p className="lesson-title">{lesson.subject}</p>
                  <p className="muted">
                    {pairTime(pairs, lesson.pair)} · {lesson.teacher} · ауд. {lesson.room}
                  </p>
                </div>
                <span className={`chip ${lesson.type}`}>{lesson.type}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <StatusBlock loading={loading} error={error}>
        <div className="week-grid">
          {Object.keys(DAY_NAMES).map((day) => {
            const key = Number(day)
            const lessons = byDay[key] || []
            return (
              <article key={day} className={`day-card${weekday === key ? ' is-today' : ''}`}>
                <header>
                  <h3>{DAY_NAMES[key]}</h3>
                  {weekday === key ? <span className="chip orange">сегодня</span> : null}
                </header>
                {lessons.length ? (
                  lessons.map((lesson) => (
                    <div key={lesson.id} className="lesson-block">
                      <p className="time">{pairTime(pairs, lesson.pair)}</p>
                      <p className="lesson-title">{lesson.subject}</p>
                      <p className="muted">
                        {lesson.teacher} · {lesson.room} · {lesson.type}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="muted">Нет занятий</p>
                )}
              </article>
            )
          })}
        </div>
      </StatusBlock>
    </section>
  )
}

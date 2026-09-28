import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBlock } from '../components/StatusBlock'
import { messagesMarkRead } from '../store/actions/messagesActions'
import { loadMessages } from '../store/actions/messagesThunks'
import { selectMessages } from '../store/selectors/appSelectors'

export function MessagesPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectMessages)
  const loading = useSelector((state) => state.messages.loading)
  const error = useSelector((state) => state.messages.error)

  useEffect(() => {
    dispatch(loadMessages())
  }, [dispatch])

  return (
    <section>
      <div className="page-head">
        <div>
          <p className="eyebrow">Сообщения</p>
          <h2>Уведомления деканата и преподавателей</h2>
        </div>
      </div>
      <StatusBlock loading={loading} error={error} isEmpty={!items.length} empty="Сообщений нет">
        <ul className="message-list">
          {items.map((item) => (
            <li key={item.id} className={`panel${item.read ? '' : ' unread'}`}>
              <div className="message-top">
                <strong>{item.title}</strong>
                <span className="muted">{new Date(item.date).toLocaleString('ru-RU')}</span>
              </div>
              <p className="muted">
                {item.from} · {item.role}
              </p>
              <p>{item.text}</p>
              {!item.read ? (
                <button className="btn btn-ghost" type="button" onClick={() => dispatch(messagesMarkRead(item.id))}>
                  Отметить прочитанным
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </StatusBlock>
    </section>
  )
}

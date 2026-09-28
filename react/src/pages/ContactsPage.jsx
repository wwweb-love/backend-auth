import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBlock } from '../components/StatusBlock'
import { loadContacts } from '../store/actions/contentThunks'
import { selectContacts } from '../store/selectors/appSelectors'

export function ContactsPage() {
  const dispatch = useDispatch()
  const contacts = useSelector(selectContacts)
  const loading = useSelector((state) => state.content.loading.contacts)

  useEffect(() => {
    dispatch(loadContacts())
  }, [dispatch])

  return (
    <section>
      <div className="page-head">
        <div>
          <p className="eyebrow">Контакты</p>
          <h2>Как нас найти</h2>
        </div>
      </div>
      <StatusBlock loading={loading} isEmpty={!contacts}>
        {contacts ? (
          <>
            <article className="panel">
              <h3>{contacts.academy}</h3>
              <p>Приёмная комиссия: {contacts.phone}</p>
              <p>{contacts.email}</p>
              <p className="muted">{contacts.hours}</p>
            </article>
            <div className="campus-grid">
              {contacts.campuses.map((item) => (
                <article key={item.name} className="panel">
                  <h3>Площадка {item.name}</h3>
                  <p>{item.address}</p>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </StatusBlock>
    </section>
  )
}

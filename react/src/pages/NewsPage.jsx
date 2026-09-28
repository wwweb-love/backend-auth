import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBlock } from '../components/StatusBlock'
import { loadNews } from '../store/actions/newsThunks'
import { selectNews, selectNewsLoading } from '../store/selectors/appSelectors'

export function NewsPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectNews)
  const loading = useSelector(selectNewsLoading)

  useEffect(() => {
    dispatch(loadNews())
  }, [dispatch])

  return (
    <section>
      <div className="page-head">
        <div>
          <p className="eyebrow">Жизнь Академии</p>
          <h2>Новости</h2>
        </div>
      </div>
      <StatusBlock loading={loading} isEmpty={!items.length} empty="Новостей нет">
        <div className="news-list">
          {items.map((item) => (
            <article key={item.id} className="panel">
              <div className="news-meta">
                <span className="chip orange">{item.tag}</span>
                <time>{item.date}</time>
              </div>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </article>
          ))}
        </div>
      </StatusBlock>
    </section>
  )
}

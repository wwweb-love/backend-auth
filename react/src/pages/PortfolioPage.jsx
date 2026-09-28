import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBlock } from '../components/StatusBlock'
import { loadPortfolio, removePortfolioFile, uploadPortfolioFile } from '../store/actions/portfolioThunks'
import {
  selectPortfolioError,
  selectPortfolioItems,
  selectPortfolioLoading,
} from '../store/selectors/portfolioSelectors'

const categories = ['курсовые', 'проекты', 'сертификаты', 'достижения', 'практика']

export function PortfolioPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectPortfolioItems)
  const loading = useSelector(selectPortfolioLoading)
  const error = useSelector(selectPortfolioError)
  const [form, setForm] = useState({ title: '', category: 'проекты', description: '' })
  const [file, setFile] = useState(null)

  useEffect(() => {
    dispatch(loadPortfolio())
  }, [dispatch])

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!file) return
    await dispatch(uploadPortfolioFile(form, file))
    setForm({ title: '', category: 'проекты', description: '' })
    setFile(null)
    event.target.reset()
  }

  return (
    <section>
      <div className="page-head">
        <div>
          <p className="eyebrow">Портфолио</p>
          <h2>Работы и достижения</h2>
        </div>
      </div>

      <form className="panel upload-form" onSubmit={onSubmit}>
        <h3>Загрузить файл</h3>
        <div className="grid-2">
          <label>
            Название
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Например, отчёт по практике"
            />
          </label>
          <label>
            Категория
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="span-2">
            Описание
            <textarea
              rows="3"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            />
          </label>
          <label className="span-2">
            Файл
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Добавить в портфолио
        </button>
      </form>

      <StatusBlock loading={loading} error={error} isEmpty={!items.length} empty="Файлов пока нет">
        <div className="portfolio-grid">
          {items.map((item) => (
            <article key={item.id} className="panel">
              <span className="chip orange">{item.category}</span>
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
              <p className="file-meta">
                {item.fileName} · {item.sizeKb} КБ · {item.uploadedAt}
              </p>
              {item.dataUrl ? (
                <a className="btn btn-ghost" href={item.dataUrl} download={item.fileName}>
                  Скачать
                </a>
              ) : (
                <p className="hint">Файл из каталога db_data (демо-запись)</p>
              )}
              {item.local ? (
                <button className="btn btn-ghost" type="button" onClick={() => dispatch(removePortfolioFile(item.id))}>
                  Удалить
                </button>
              ) : null}
            </article>
          ))}
        </div>
      </StatusBlock>
    </section>
  )
}

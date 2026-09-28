import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBlock } from '../components/StatusBlock'
import { loadLibrary } from '../store/actions/contentThunks'
import { selectLibrary } from '../store/selectors/appSelectors'

export function LibraryPage() {
  const dispatch = useDispatch()
  const resources = useSelector(selectLibrary)
  const loading = useSelector((state) => state.content.loading.library)

  useEffect(() => {
    dispatch(loadLibrary())
  }, [dispatch])

  return (
    <section>
      <div className="page-head">
        <div>
          <p className="eyebrow">Библиотека</p>
          <h2>Информационно-образовательные ресурсы</h2>
        </div>
      </div>
      <StatusBlock loading={loading} isEmpty={!resources.length} empty="Каталог пуст">
        <div className="table-wrap panel">
          <table>
            <thead>
              <tr>
                <th>Издание</th>
                <th>Автор</th>
                <th>Год</th>
                <th>Формат</th>
                <th>Дисциплина</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.year}</td>
                  <td>{item.format}</td>
                  <td>{item.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StatusBlock>
    </section>
  )
}

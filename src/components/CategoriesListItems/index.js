import './index.css'
import {Link} from 'react-router-dom'

const CategoriesListItems = props => {
  const {item} = props
  const {icons, id} = item
  let icon

  if (icons !== undefined) {
    icon = icons.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr,
    )
    icon = icon.url
  } else {
    icon = null
  }
  return (
    <li className="genres-moods-item">
      <Link to={`/category/${id}/playlists`}>
        <img src={icon} alt="category" className="genres-moods-item-image" />
      </Link>
    </li>
  )
}

export default CategoriesListItems

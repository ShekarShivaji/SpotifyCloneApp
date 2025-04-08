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
    <Link to={`/category/${id}/playlists`}>
      <li className="genres-moods-item" data-testid="genresMoodsItem">
        <img src={icon} alt="category" className="genres-moods-item-image" />
      </li>
    </Link>
  )
}

export default CategoriesListItems

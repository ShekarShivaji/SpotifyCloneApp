import './index.css'
import {Link} from 'react-router-dom'

const CategoriesListItems = props => {
  const {item} = props
  const {icon, id} = item
  return (
    <li className="genres-moods-item">
      <Link to={`/category-playlists/${id}`}>
        <img src={icon} alt="category" className="genres-moods-item-image" />
      </Link>
    </li>
  )
}

export default CategoriesListItems

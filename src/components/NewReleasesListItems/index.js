import './index.css'
import {Link} from 'react-router-dom'

const NewReleasesListItems = props => {
  const {item} = props
  const {image, id, name} = item

  return (
    <li className="new-release-item">
      <Link style={{textDecoration: 'none'}} to={`/new-releases/album/${id}`}>
        <img src={image} alt="nw-rls-albm" className="new-release-item-image" />
        <p className="new-release-item-name">{name}</p>
      </Link>
    </li>
  )
}

export default NewReleasesListItems

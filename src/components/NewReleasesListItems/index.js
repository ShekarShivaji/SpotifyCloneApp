import './index.css'
import {Link} from 'react-router-dom'

const NewReleasesListItems = props => {
  const {item} = props
  const {images, id, name} = item

  let url

  if (images !== undefined) {
    url = images.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr,
    )
    url = url.url
  } else {
    url = null
  }

  return (
    <li className="new-release-item">
      <Link className="list-Style" to={`/album/${id}`}>
        <img
          src={url}
          alt="new release album"
          className="new-release-item-image"
        />
      </Link>
      <p className="new-release-item-name">{name}</p>
    </li>
  )
}

export default NewReleasesListItems

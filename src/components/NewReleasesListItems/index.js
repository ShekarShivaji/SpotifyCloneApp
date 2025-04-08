import './index.css'
import {Link} from 'react-router-dom'

const NewReleasesListItems = props => {
  const {item} = props
  const {images, id, name} = item

  let image

  if (images !== undefined) {
    image = images.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr,
    )
  } else {
    image = null
  }

  return (
    <Link className="list-Style" to={`/album/${id}`}>
      <li className="new-release-item" data-testid="newReleaseItem">
        <img
          src={image.url}
          alt="new release album"
          className="new-release-item-image"
        />
        <p className="new-release-item-name">{name}</p>
      </li>
    </Link>
  )
}

export default NewReleasesListItems

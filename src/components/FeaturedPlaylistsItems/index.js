import './index.css'
import {Link} from 'react-router-dom'

const FeaturedPlaylistsItems = props => {
  const {item} = props
  const {id, images, name} = item
  let image

  if (images !== undefined) {
    image = images.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr,
    )
    image = image.url
  } else {
    image = null
  }

  return (
    <Link className="list-Style" to={`/playlist/${id}`}>
      <li className="play-list-item" data-testid="playListItem ">
        <img src={image} alt="featured playlist" className="playlistimage" />

        <p className="playlistname">{name}</p>
      </li>
    </Link>
  )
}

export default FeaturedPlaylistsItems

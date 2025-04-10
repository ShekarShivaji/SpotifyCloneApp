import './index.css'
import {Link} from 'react-router-dom'

const FeaturedPlaylistsItems = props => {
  const {item} = props
  const {id, images, name} = item

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
    <li className="play-list-item">
      <Link className="list-Style" to={`/playlist/${id}`}>
        <img src={url} alt="featured playlist" className="playlistimage" />
      </Link>
      <p className="playlistname">{name}</p>
    </li>
  )
}

export default FeaturedPlaylistsItems

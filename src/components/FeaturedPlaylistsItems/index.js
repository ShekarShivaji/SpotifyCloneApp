import './index.css'
import {Link} from 'react-router-dom'

const FeaturedPlaylistsItems = props => {
  const {item} = props
  const {id, image, name} = item
  return (
    <Link className="list-Style" to={`/playlists-details/${id}`}>
      <li className="playlistItem">
        <img src={image} alt="featured playlist" className="playlistimage" />

        <p className="playlistname">{name}</p>
      </li>
    </Link>
  )
}

export default FeaturedPlaylistsItems

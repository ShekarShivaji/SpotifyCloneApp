import './index.css'
import {Link} from 'react-router-dom'

const FeaturedPlaylistsItems = props => {
  const {item} = props
  const {id, image, name} = item
  return (
    <li className="playlistItem">
      <Link className="list-Style" to={`/playlists-details/${id}`}>
        <img src={image} alt="featured playlist" className="playlistimage" />
      </Link>
      <p className="playlistname">{name}</p>
    </li>
  )
}

export default FeaturedPlaylistsItems

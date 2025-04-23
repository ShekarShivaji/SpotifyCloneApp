import moment from 'moment'
import './index.css'

const SongItem = props => {
  const {songInfo, selectSong, index, isActive, displayInfo} = props
  const {artists, album, durationMs, name} = songInfo

  const activeSongClass = isActive && 'activeClass'

  let image

  if (album !== undefined) {
    image = album.images.reduce((prev, curr) =>
      prev.height < curr.height ? prev : curr,
    )
    image = image.url
  } else {
    image = displayInfo.images[0].url
  }

  const onClickSelectSong = () => {
    selectSong(index)
  }

  const getFormaDistance = added => {
    const addedAgo = moment(added, 'YYYYMMDD').fromNow()
    return addedAgo
  }

  const getDurationTime = inMilliSecs => {
    const inSecs = moment.duration(inMilliSecs).seconds()
    const inMins = moment.duration(inMilliSecs).minutes()

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`
    }
    return `${inMins}:${inSecs}`
  }

  return (
    <li className={`song-row ${activeSongClass}`} onClick={onClickSelectSong}>
      <img src={image} alt="album" className="song-thumbnail" />
      <div className="song-info">
        <span className="song-name">{name}</span>
        <span className="artist-name">
          {artists ? artists[0].name : 'Artist'}
        </span>
        <span className="album-name">{album ? album.name : '(Album?)'}</span>
        <span className="duration">{getDurationTime(durationMs)}</span>
        <span className="added">
          {album
            ? getFormaDistance(album.release_date)
            : getFormaDistance(displayInfo.releaseDate)}
        </span>
      </div>
    </li>
  )
}

export default SongItem

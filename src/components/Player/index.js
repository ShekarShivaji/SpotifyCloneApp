import './index.css'
import {Component} from 'react'
import {BiVolumeFull} from 'react-icons/bi'
import {FiPlay, FiPause} from 'react-icons/fi'
import {IoMdArrowRoundBack} from 'react-icons/io'
import {BsSkipForward, BsSkipBackward} from 'react-icons/bs'
import {withRouter} from 'react-router-dom'
import AlbumInfo from '../AlbumInfo/index'
import SongItem from '../SongItem/index'
import Navbar from '../Navbar/index'

class Player extends Component {
  state = {
    ...this.props,
    activeSongClass: 0,
    index: 0,
    pause: false,
    currTime: '0:00',
    seek: 0,
    volume: 5,
  }

  componentDidMount() {
    this.playerRef.addEventListener('timeupdate', this.timeUpdate)
    this.playerRef.addEventListener('ended', this.nextSong)
    this.playerRef.addEventListener('volumechange', this.adjustVolume)
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    this.playerRef.removeEventListener('timeupdate', this.timeUpdate)
    this.playerRef.removeEventListener('ended', this.nextSong)
    this.playerRef.removeEventListener('volumechange', this.adjustVolume)
  }

  getArtistName = artist => {
    if (artist !== undefined) {
      return artist[0].name
    }
    return 'Artist'
  }

  onClickSelectSong = indx => {
    this.setState(
      {
        index: indx,
        activeSongClass: indx,
        pause: true,
      },
      this.updatePlayer,
    )
  }

  prevSong = () => {
    const {index, activeSongClass, pause} = this.state

    if (index - 1 >= 0 && activeSongClass - 1 >= 0) {
      this.setState(
        {
          index: index - 1,
          activeSongClass: activeSongClass - 1,
        },
        this.updatePlayer,
      )
    } else {
      this.playerRef.pause()
      this.setState({pause: !pause})
    }
  }

  nextSong = () => {
    const {index, activeSongClass, pause, musicList} = this.state

    if (
      index + 1 === musicList.length &&
      activeSongClass + 1 === musicList.length
    ) {
      this.playerRef.pause()
      this.setState({pause: !pause})
    } else {
      this.setState(
        {
          index: index + 1,
          activeSongClass: activeSongClass + 1,
        },
        this.updatePlayer,
      )
    }
  }

  playOrPause = () => {
    const {musicList, index, pause} = this.state
    const currentSong = musicList[index]
    const audio = new Audio(currentSong.audio)
    console.log(audio)

    if (!pause) {
      this.playerRef.play()
    } else {
      this.playerRef.pause()
    }
    this.setState({
      pause: !pause,
    })
  }

  updatePlayer = () => {
    const {musicList, index, pause} = this.state

    const currentSong = musicList[index]
    const audio = new Audio(currentSong.audio)
    console.log(audio)
    this.playerRef.load()

    if (pause) {
      this.playerRef.play()
    } else {
      this.playerRef.pause()
    }
  }

  timeUpdate = () => {
    const {currentTime} = this.playerRef

    const inMins = Math.floor(currentTime / 60)
    const inSecs = Math.floor(currentTime % 60)
    const progress =
      100 * (this.playerRef.currentTime / this.playerRef.duration)

    if (inSecs < 10) {
      this.setState({currTime: `${inMins}:0${inSecs}`, seek: progress})
    } else {
      this.setState({currTime: `${inMins}:${inSecs}`, seek: progress})
    }
  }

  formatTime = secs => {
    const inMins = Math.floor(secs / 60)
    const inSecs = Math.floor(secs % 60)

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`
    }
    return `${inMins}:${inSecs}`
  }

  onClickSelectSong = indx => {
    this.setState(
      {
        index: indx,
        activeSongClass: indx,
        pause: true,
      },
      this.updatePlayer,
    )
  }

  changeCurrTime = () => {
    const {seek} = this.state
    this.playerRef.currentTime = (this.playerRef.duration * seek) / 100
  }

  adjustVolume = () => {
    const {volume} = this.state
    this.playerRef.volume = volume / 10
  }

  changeSeekSlider = event => {
    this.setState({seek: event.target.value}, this.changeCurrTime)
  }

  changeVolumeSlider = event => {
    this.setState({volume: event.target.value}, this.adjustVolume)
  }

  getAlbumImageArtist = currSong => {
    const {displayInfo} = this.state
    const {album, artists} = currSong
    let image
    let artist
    if (album !== undefined) {
      image = album.images.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr,
      )
      image = image.url
    } else {
      image = displayInfo.images[0].url
    }

    if (artists !== undefined) {
      artist = artists[0].name
    } else {
      artist = 'Artist'
    }

    return {albumImage: image, albumArtist: artist}
  }

  renderMusicControlDesktopView = () => {
    const {musicList, index, pause, currTime, seek, volume} = this.state
    const currSong = musicList[index]
    const {durationMs} = currSong

    const {albumImage, albumArtist} = this.getAlbumImageArtist(currSong)
    console.log(currSong)
    return (
      <>
        <audio
          ref={ref => {
            this.playerRef = ref
          }}
        >
          <source src={currSong.previewUrl} type="audio/mp3" />
          <track kind="captions" srcLang="en" />
        </audio>
        <img src={albumImage} alt="album" className="album-img" />
        <div className="album-information">
          <p className="album-name">{currSong.name}</p>
          <div className="artist-div">
            <span className="artist-name">{albumArtist}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={this.prevSong}
          className="next-prev-button"
        >
          <BsSkipBackward className="next-prev-icon" />
        </button>
        <button
          type="button"
          onClick={this.playOrPause}
          className="play-pause-button"
        >
          {!pause ? (
            <FiPlay className="play-pause-icon" />
          ) : (
            <FiPause className="play-pause-icon" />
          )}
        </button>
        <button
          type="button"
          onClick={this.nextSong}
          className="next-prev-button"
        >
          <BsSkipForward className="next-prev-icon" />
        </button>
        <span className="time-update">
          {this.formatTime(durationMs / 1000)}
        </span>
        <input
          type="range"
          className="seek-slider"
          value={seek}
          onChange={this.changeSeekSlider}
          max="100"
        />
        <span className="time-update">{currTime}</span>
        <BiVolumeFull className="volume-icon" />
        <input
          type="range"
          max="10"
          value={volume}
          className="volume-slider"
          onChange={this.changeVolumeSlider}
        />
      </>
    )
  }

  renderMusicControlsMobileView = () => {
    const {musicList, index, pause} = this.state
    const currentSong = musicList[index]
    const {albumImage, albumArtist} = this.getAlbumImageArtist(currentSong)

    return (
      <>
        <audio
          ref={ref => {
            this.playerRef = ref
          }}
        >
          <source src={currentSong.previewUrl} type="audio/mp3" />
          <track kind="captions" srcLang="en" />
        </audio>
        <img src={albumImage} alt="album" className="album-img" />
        <div className="album-info">
          <p className="album-name">{currentSong.name}</p>
          <div className="artist-div">
            <span className="artist-name">{albumArtist}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={this.prevSong}
          className="next-prev-button"
        >
          <BsSkipBackward className="next-prev-icon" />
        </button>
        <button
          type="button"
          onClick={this.playOrPause}
          className="play-pause-button"
        >
          {!pause ? (
            <FiPlay className="play-pause-icon" />
          ) : (
            <FiPause className="play-pause-icon" />
          )}
        </button>
        <button
          type="button"
          onClick={this.nextSong}
          className="next-prev-button"
        >
          <BsSkipForward className="next-prev-icon" />
        </button>
      </>
    )
  }

  renderSongslist = () => {
    const {activeSongClassm, musicList, displayInfo} = this.state

    return (
      <>
        {musicList.map((item, key = 0) => (
          <SongItem
            songInfo={item}
            displayInfo={displayInfo}
            isActive={activeSongClassm === key}
            selectSong={this.onClickSelectSong}
            index={key}
            key={key}
          />
        ))}
      </>
    )
  }

  onClickBackbtn = () => {
    const {history} = this.props
    history.goBack()
  }

  render() {
    const {displayInfo, section} = this.state
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="category-bg-container">
            <button
              type="button"
              onClick={this.onClickBackbtn}
              className="backButton"
            >
              <span>
                <IoMdArrowRoundBack />
              </span>
              <span>Back</span>
            </button>

            <AlbumInfo displayInfo={displayInfo} section={section} />
            <div id="columns-row" className="displayInfoHeadings">
              <span id="column-name">Track</span>
              <span id="column-name">Album</span>
              <span id="column-name">Time</span>
              <span id="column-name">Artist</span>
              <span id="column-name">Added</span>
            </div>
            <hr style={{width: '95%', border: '1px solid #475569'}} />
            <ul className="playlist">{this.renderSongslist()}</ul>
            <div className="music-controlers-desktop-view">
              {this.renderMusicControlDesktopView()}
            </div>
            <div className="music-controlers-mobile-view">
              {this.renderMusicControlsMobileView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Player)

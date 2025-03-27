import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Player from '../Player/index'

class AlbumDetailsRoute extends Component {
  state = {
    musicList: [],
    displayInfo: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getplaylistDetails()
  }

  getplaylistDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedInfo = {
        albumType: data.album_type,
        artists: data.artists,
        availableMarkets: data.available_markets,
        copyrights: data.copyrights,
        externalIds: data.external_ids,
        externalUrls: data.external_urls,
        genres: data.genres,
        href: data.href,
        id: data.id,
        images: data.images,
        label: data.label,
        name: data.name,
        popularity: data.popularity,
        releaseDate: data.release_date,
        releaseDatePrecision: data.release_date_precision,
        totalTracks: data.total_tracks,
        tracks: data.tracks,
        type: data.type,
        uri: data.uri,
      }
      console.log(updatedInfo)

      const updatedData = data.tracks.items.map(item => ({
        artists: item.artists,
        availableMarkets: item.available_markets,
        discNumber: item.disc_number,
        durationMs: item.duration_ms,
        explicit: item.explicit,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        isLocal: item.is_local,
        name: item.name,
        previewUrl: item.preview_url,
        trackNumber: item.track_number,
        type: item.type,
        uri: item.uri,
      }))

      this.setState({
        musicList: updatedData,
        displayInfo: updatedInfo,
        isLoading: false,
      })

      this.setState({
        musicList: updatedData,
        displayInfo: updatedInfo,
        isLoading: false,
      })
    }
  }

  renderLodingView = () => (
    <div className="loading-view">
      <img
        src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740494566/Vector_anoy5d.png"
        alt="website logo"
        className="logo-img"
      />
      <h1 className="loading-text">Loading...</h1>
    </div>
  )

  render() {
    const {isLoading, displayInfo, musicList} = this.state
    return (
      <div className="home-bg-container">
        {isLoading ? (
          this.renderLodingView()
        ) : (
          <Player
            displayInfo={displayInfo}
            section="Editor's pick's"
            musicList={musicList}
          />
        )}
      </div>
    )
  }
}

export default AlbumDetailsRoute

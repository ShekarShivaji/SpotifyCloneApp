import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Player from '../Player/index'

class SpecificPlaylistDetailsRoute extends Component {
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
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
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
      const updatedPlaylistInfo = {
        collaborative: data.collaborative,
        description: data.description,
        externalUrls: data.external_urls,
        href: data.href,
        id: data.id,
        images: data.images,
        name: data.name,
        owner: data.owner,
        primaryColor: data.primary_color,
        public: data.public,
        snapshotId: data.snapshot_id,
        tracks: data.tracks,
        type: data.type,
        uri: data.uri,
      }

      const updatedTracksData = data.tracks.items.map(item => ({
        album: item.track.album,
        artists: item.track.artists,
        availableMarkets: item.track.available_markets,
        discNumber: item.track.disc_number,
        durationMs: item.track.duration_ms,
        episode: item.track.episode,
        explicit: item.track.explicit,
        externalIds: item.track.external_ids,
        externalUrls: item.track.external_urls,
        href: item.track.href,
        id: item.track.id,
        isLocal: item.track.is_local,
        name: item.track.name,
        popularity: item.track.popularity,
        previewUrl: item.track.preview_url,
        track: item.track.track,
        trackNumber: item.track.track_number,
        type: item.track.type,
        uri: item.track.uri,
      }))

      this.setState({
        musicList: updatedTracksData,
        displayInfo: updatedPlaylistInfo,
        isLoading: false,
      })
    }
  }

  renderLodingView = () => (
    <div className="loading-view">
      <img
        src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740494566/Vector_anoy5d.png"
        alt="logo"
        className="logo-img"
      />
      <h1 className="loading-text">Loading...</h1>
    </div>
  )

  render() {
    const {isLoading, displayInfo, musicList} = this.state
    return (
      <>
        <div
          className="specific-bg-container"
          data-testid="specific-bg-container"
        >
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
      </>
    )
  }
}

export default SpecificPlaylistDetailsRoute

import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoMdArrowRoundBack} from 'react-icons/io'
import GenreCategoryItem from '../GenreCategoryItem'
import Navbar from '../Navbar/index'
import './index.css'

class CategoryPlaylistsDetailsRoute extends Component {
  state = {genreListData: [], isLoading: true}

  componentDidMount() {
    this.getGenrePlayList()
  }

  getAccessToken = () => {
    const token = Cookies.get('jwt_token')
    return token
  }

  getGenrePlayList = async () => {
    const token = this.getAccessToken()

    const {match} = this.props
    const {params} = match
    const {id} = params

    const genreListApiUrl = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const genreListOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(genreListApiUrl, genreListOptions)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.playlists.items.map(item => ({
        collaborative: item.collaborative,
        description: item.description,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        owner: item.owner,
        primaryColor: item.primary_color,
        public: item.public,
        snapshotId: item.snapshot_id,
        tracks: item.tracks,
        type: item.type,
        uri: item.uri,
      }))

      this.setState({genreListData: updatedData, isLoading: false})
    }
  }

  renderPage = () => {
    const {genreListData} = this.state

    return (
      <div className="category-bg-container">
        <h1 className="category-heading">Podcast</h1>
        <ul className="genre-list-container">
          {genreListData.map(item => (
            <GenreCategoryItem genreListItem={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
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

  onClickBackbtn = () => {
    const {history} = this.props
    history.goBack()
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <div
          className="category-bg-container"
          data-testid="categoryBgContainer"
        >
          <Navbar />
          <div className="container">
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
            <div className="categoriesItemsSection">
              {isLoading ? this.renderLodingView() : this.renderPage()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default CategoryPlaylistsDetailsRoute

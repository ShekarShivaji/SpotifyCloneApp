import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Navbar from '../Navbar/index'
import FeaturedPlaylistsItems from '../FeaturedPlaylistsItems/index'
import HomeFailuar from '../HomeFailuar/index'
import CategoriesListItems from '../CategoriesListItems/index'
import NewReleasesListItems from '../NewReleasesListItems/index'
import Loading from '../Loading/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    isLoadingEditorsPick: apiStatusConstants.initial,
    isLoadingCategories: apiStatusConstants.initial,
    isLoadingNewReleases: apiStatusConstants.initial,
    featuredPlaylists: [],
    categoriesList: [],
    newReleasesList: [],
  }

  componentDidMount() {
    this.getEditorsPickData()
    this.getGenreAndMoodsData()
    this.getNewReleasesData()
  }

  updateData1 = data1 => {
    const {playlists} = data1
    const {items} = playlists
    const updatedData = items.map(item => ({
      name: item.name,
      images: item.images,
      id: item.id,
    }))
    return updatedData
  }

  updateData2 = data2 => {
    const {categories} = data2
    const {items} = categories
    const updatedData = items.map(item => ({
      name: item.name,
      icons: item.icons,
      id: item.id,
    }))
    return updatedData
  }

  updateData3 = data3 => {
    const {albums} = data3
    const {items} = albums
    const updatedData = items.map(item => ({
      name: item.name,
      images: item.images,
      id: item.id,
    }))
    return updatedData
  }

  getEditorsPickData = async () => {
    this.setState({isLoadingEditorsPick: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response1 = await fetch(
      'https://apis2.ccbp.in/spotify-clone/featured-playlists',
      options,
    )
    if (response1.ok === true) {
      const data1 = await response1.json()
      this.setState({
        featuredPlaylists: this.updateData1(data1),
        isLoadingEditorsPick: apiStatusConstants.success,
      })
    }

    if (!response1.ok) {
      this.setState({
        isLoadingEditorsPick: apiStatusConstants.failure,
      })
    }
  }

  getGenreAndMoodsData = async () => {
    this.setState({isLoadingCategories: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response2 = await fetch(
      'https://apis2.ccbp.in/spotify-clone/categories',
      options,
    )
    if (response2.ok === true) {
      const data2 = await response2.json()
      this.setState({
        categoriesList: this.updateData2(data2),
        isLoadingCategories: apiStatusConstants.success,
      })
    }

    if (!response2.ok) {
      this.setState({
        isLoadingCategories: apiStatusConstants.failure,
      })
    }
  }

  getNewReleasesData = async () => {
    this.setState({isLoadingNewReleases: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response3 = await fetch(
      'https://apis2.ccbp.in/spotify-clone/new-releases',
      options,
    )

    if (response3.ok === true) {
      const data3 = await response3.json()
      this.setState({
        newReleasesList: this.updateData3(data3),
        isLoadingNewReleases: apiStatusConstants.success,
      })
    }

    if (!response3.ok) {
      this.setState({
        isLoadingNewReleases: apiStatusConstants.failure,
      })
    }
  }

  renderEditorsPicksView = () => {
    const {isLoadingEditorsPick} = this.state
    switch (isLoadingEditorsPick) {
      case apiStatusConstants.success:
        return this.renderEditorsPicksList()
      case apiStatusConstants.failure:
        return <HomeFailuar getData={this.getEditorsPickData} />
      case apiStatusConstants.inProgress:
        return <Loading />
      default:
        return null
    }
  }

  renderEditorsPicksList = () => {
    const {featuredPlaylists} = this.state

    return (
      <ul className="list-item-container" data-testid="featuredPlaylists">
        {featuredPlaylists.map(item => (
          <FeaturedPlaylistsItems item={item} key={item.id} />
        ))}
      </ul>
    )
  }

  renderGenresAndMoodView = () => {
    const {isLoadingCategories} = this.state
    switch (isLoadingCategories) {
      case apiStatusConstants.success:
        return this.renderGenresAndMoodList()
      case apiStatusConstants.failure:
        return <HomeFailuar getData={this.getGenreAndMoodsData} />
      case apiStatusConstants.inProgress:
        return <Loading />
      default:
        return null
    }
  }

  renderGenresAndMoodList = () => {
    const {categoriesList} = this.state
    return (
      <ul className="list-item-container" data-testid="categoriesList">
        {categoriesList.map(item => (
          <CategoriesListItems item={item} key={item.id} />
        ))}
      </ul>
    )
  }

  renderNewReleasesView = () => {
    const {isLoadingNewReleases} = this.state
    switch (isLoadingNewReleases) {
      case apiStatusConstants.success:
        return this.renderNewReleasesList()
      case apiStatusConstants.failure:
        return <HomeFailuar getData={this.getNewReleasesData} />
      case apiStatusConstants.inProgress:
        return <Loading />
      default:
        return null
    }
  }

  renderNewReleasesList = () => {
    const {newReleasesList} = this.state
    return (
      <ul className="list-item-container" data-testid="newReleasesList">
        {newReleasesList.map(item => (
          <NewReleasesListItems item={item} key={item.id} />
        ))}
      </ul>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="home-bg-container" data-testid="homeBgContainer">
        <Navbar />
        <div className="container" data-testid="container">
          <h1 className="headings">Editors Picks</h1>
          {this.renderEditorsPicksView()}
          <h1 className="headings">Genres & Moods</h1>
          {this.renderGenresAndMoodView()}
          <h1 className="headings">New releases</h1>
          {this.renderNewReleasesView()}
        </div>
      </div>
    )
  }
}

export default HomeRoute

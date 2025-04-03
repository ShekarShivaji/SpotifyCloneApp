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

class HomeRoute extends Component {
  state = {
    isLoadingEditorsPick: true,
    isLoadingCategories: true,
    isLoadingNewReleases: true,
    error1: null,
    error2: null,
    error3: null,
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
      image: item.images[0].url,
      id: item.id,
    }))
    return updatedData
  }

  updateData2 = data2 => {
    const {categories} = data2
    const {items} = categories
    const updatedData = items.map(item => ({
      name: item.name,
      icon: item.icons[0].url,
      id: item.id,
    }))
    return updatedData
  }

  updateData3 = data3 => {
    const {albums} = data3
    const {items} = albums
    const updatedData = items.map(item => ({
      name: item.name,
      image: item.images[0].url,
      id: item.id,
    }))
    return updatedData
  }

  getEditorsPickData = async () => {
    this.setState({isLoadingEditorsPick: true})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response1 = await fetch(
        'https://apis2.ccbp.in/spotify-clone/featured-playlists',
        options,
      )
      if (response1.ok === true) {
        const data1 = await response1.json()
        this.setState({
          featuredPlaylists: this.updateData1(data1),
          isLoadingEditorsPick: false,
        })
      }
    } catch (error1) {
      this.setState({error1, isLoadingEditorsPick: false})
    }
  }

  getGenreAndMoodsData = async () => {
    this.setState({isLoadingCategories: true})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response2 = await fetch(
        'https://apis2.ccbp.in/spotify-clone/categories',
        options,
      )
      if (response2.ok === true) {
        const data2 = await response2.json()
        this.setState({
          categoriesList: this.updateData2(data2),
          isLoadingCategories: false,
        })
      }
    } catch (error2) {
      this.setState({error2, isLoadingCategories: false})
    }
  }

  getNewReleasesData = async () => {
    this.setState({isLoadingNewReleases: true})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response3 = await fetch(
        'https://apis2.ccbp.in/spotify-clone/new-releases',
        options,
      )

      if (response3.ok === true) {
        const data3 = await response3.json()
        this.setState({
          newReleasesList: this.updateData3(data3),
          isLoadingNewReleases: false,
        })
      }
    } catch (error3) {
      this.setState({error3, isLoadingNewReleases: false})
    }
  }

  renderEditorsPicksList = () => {
    const {featuredPlaylists, error1} = this.state
    return (
      <>
        <h1 className="headings">Editor&apos;s picks</h1>
        {error1 ? (
          <HomeFailuar getData={this.getEditorsPickData} />
        ) : (
          <ul className="list-item-container">
            {featuredPlaylists.map(item => (
              <FeaturedPlaylistsItems item={item} key={item.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderGenresAndMoodList = () => {
    const {categoriesList, error2} = this.state
    return (
      <>
        <h1 className="headings">Genres & Moods</h1>
        {error2 ? (
          <HomeFailuar getData={this.getGenreAndMoodsData} />
        ) : (
          <ul className="list-item-container">
            {categoriesList.map(item => (
              <CategoriesListItems item={item} key={item.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderNewReleasesList = () => {
    const {newReleasesList, error3} = this.state
    return (
      <>
        <h1 className="headings">New releases</h1>
        {error3 ? (
          <HomeFailuar getData={this.getNewReleasesData} />
        ) : (
          <ul className="list-item-container">
            {newReleasesList.map(item => (
              <NewReleasesListItems item={item} key={item.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderHomeView = () => {
    const {
      isLoadingEditorsPick,
      isLoadingCategories,
      isLoadingNewReleases,
    } = this.state
    return (
      <>
        {isLoadingEditorsPick ? <Loading /> : this.renderEditorsPicksList()}
        {isLoadingCategories ? <Loading /> : this.renderGenresAndMoodList()}
        {isLoadingNewReleases ? <Loading /> : this.renderNewReleasesList()}
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div data-testid="homeBgContainer" className="home-bg-container">
        <Navbar />
        <div className="container" data-testid="container">
          {this.renderHomeView()}
        </div>
      </div>
    )
  }
}

export default HomeRoute

import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Navbar from '../Navbar/index'
import FeaturedPlaylistsItems from '../FeaturedPlaylistsItems/index'
import HomeFailuar from '../HomeFailuar/index'
import CategoriesListItems from '../CategoriesListItems/index'
import NewReleasesListItems from '../NewReleasesListItems/index'
import Loading from '../Loading/index'

class HomeRoute extends Component {
  state = {
    isLoadingHome: true,
    isLoading: true,
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
    this.setState({isLoading: true})
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
          isLoadingHome: false,
          isLoading: false,
        })
      }
    } catch (error1) {
      this.setState({error1, isLoading: false})
    }
  }

  getGenreAndMoodsData = async () => {
    this.setState({isLoading: true})
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
          isLoading: false,
        })
      }
    } catch (error2) {
      this.setState({error2, isLoading: false})
    }
  }

  getNewReleasesData = async () => {
    this.setState({isLoading: true})
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
          isLoading: false,
        })
      }
    } catch (error3) {
      this.setState({error3, isLoading: false})
    }
  }

  render() {
    const {
      featuredPlaylists,
      newReleasesList,
      categoriesList,
      error1,
      error2,
      error3,
      isLoading,
      isLoadingHome,
    } = this.state
    return (
      <div className="home-bg-container" data-testid="homeBgContainer">
        {isLoadingHome ? (
          <div className="loading-view">
            <img
              src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740494566/Vector_anoy5d.png"
              alt="logo"
              className="logo-img"
            />
            <h1 className="loading-text">Loading...</h1>
          </div>
        ) : (
          <>
            <Navbar />
            <div className="container">
              <div data-testid="loader">
                <h1 className="headings">Editors Picks</h1>
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    {error1 !== null ? (
                      <HomeFailuar getData={this.getEditorsPickData} />
                    ) : (
                      <ul className="list-item-container">
                        {featuredPlaylists.map(item => (
                          <FeaturedPlaylistsItems item={item} key={item.id} />
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
              <div data-testid="loader">
                <h1 className="headings">Genres & Moods</h1>
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    {error2 !== null ? (
                      <HomeFailuar getData={this.getGenreAndMoodsData} />
                    ) : (
                      <ul className="list-item-container">
                        {categoriesList.map(item => (
                          <CategoriesListItems item={item} key={item.id} />
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
              <div data-testid="loader">
                <h1 className="headings">New releases</h1>
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    {error3 !== null ? (
                      <HomeFailuar getData={this.getNewReleasesData} />
                    ) : (
                      <ul className="list-item-container">
                        {newReleasesList.map(item => (
                          <NewReleasesListItems item={item} key={item.id} />
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default HomeRoute

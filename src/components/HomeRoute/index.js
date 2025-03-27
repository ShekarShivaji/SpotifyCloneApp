import './index.css'
import {Component} from 'react'
import Navbar from '../Navbar/index'
import FeaturedPlaylistsItems from '../FeaturedPlaylistsItems/index'
import HomeFailuar from '../HomeFailuar/index'
import CategoriesListItems from '../CategoriesListItems/index'
import NewReleasesListItems from '../NewReleasesListItems/index'

class HomeRoute extends Component {
  state = {
    isLoading: true,
    error: null,
    featuredPlaylists: [],
    categoriesList: [],
    newReleasesList: [],
  }

  componentDidMount() {
    this.getData()
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

  getData = async () => {
    this.setState({isLoading: true})
    try {
      const [response1, response2, response3] = await Promise.all([
        fetch('https://apis2.ccbp.in/spotify-clone/featured-playlists'),
        fetch('https://apis2.ccbp.in/spotify-clone/categories'),
        fetch('https://apis2.ccbp.in/spotify-clone/new-releases'),
      ])

      const data1 = await response1.json()
      const data2 = await response2.json()
      const data3 = await response3.json()

      this.setState({
        featuredPlaylists: this.updateData1(data1),
        categoriesList: this.updateData2(data2),
        newReleasesList: this.updateData3(data3),
        isLoading: false,
      })
    } catch (error) {
      this.setState({error, isLoading: false})
    }
  }

  render() {
    const {
      featuredPlaylists,
      newReleasesList,
      categoriesList,
      error,
      isLoading,
    } = this.state
    return (
      <div className="home-bg-container" data-testid="homeBgContainer">
        {isLoading ? (
          <div className="loading-view">
            <img
              src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740494566/Vector_anoy5d.png"
              alt="website logo"
              className="logo-img"
            />
            <h1 className="loading-text">Loading...</h1>
          </div>
        ) : (
          <>
            <Navbar />
            <div className="container">
              <h1 className="headings">Editors picks</h1>
              {error !== null ? (
                <HomeFailuar getData={this.getData} />
              ) : (
                <ul className="list-item-container" data-testid="loader">
                  {featuredPlaylists.map(item => (
                    <FeaturedPlaylistsItems item={item} key={item.id} />
                  ))}
                </ul>
              )}
              <h1 className="headings">Genres & Moods</h1>
              {error !== null ? (
                <HomeFailuar getData={this.getData} />
              ) : (
                <ul className="list-item-container" data-testid="loader">
                  {categoriesList.map(item => (
                    <CategoriesListItems item={item} key={item.id} />
                  ))}
                </ul>
              )}
              <h1 className="headings">New releases</h1>
              {error !== null ? (
                <HomeFailuar getData={this.getData} />
              ) : (
                <ul className="list-item-container" data-testid="loader">
                  {newReleasesList.map(item => (
                    <NewReleasesListItems item={item} key={item.id} />
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    )
  }
}

export default HomeRoute

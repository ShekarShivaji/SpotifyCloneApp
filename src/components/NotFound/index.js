import './index.css'
import Navbar from '../Navbar/index'

const NotFound = () => (
  <div className="home-bg-container">
    <Navbar />
    <div className="container">
      <div className="not-found-container">
        <img
          src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740984739/404_l1uonl.png"
          alt="page not found"
          className="page-not-found-img"
        />
        <h1 className="page-not-found-text">Page Not Found</h1>
      </div>
    </div>
  </div>
)

export default NotFound

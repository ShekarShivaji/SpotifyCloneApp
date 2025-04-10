import './index.css'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar/index'

const NotFound = () => (
  <div className="notfound-bg-container">
    <Navbar />
    <div className="bg-container">
      <div className="not-found-container">
        <img
          src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740984739/404_l1uonl.png"
          alt="page not found"
          className="page-not-found-img"
        />
        <h1 className="page-not-found-text">Page Not Found</h1>
        <Link to="/">
          <button type="button">Home Page</button>
        </Link>
      </div>
    </div>
  </div>
)

export default NotFound

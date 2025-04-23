import './index.css'
import {withRouter, Link} from 'react-router-dom'
import {IoMdLogOut} from 'react-icons/io'
import Cookies from 'js-cookie'

const Navbar = props => {
  const logutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          alt="website logo"
          src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740494566/Vector_anoy5d.png"
          className="logo-img"
        />
      </Link>

      <button onClick={logutButton} type="button" className="logout-button">
        <IoMdLogOut size="25" />
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Navbar)

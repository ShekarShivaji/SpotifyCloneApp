import './index.css'
import {withRouter, Link} from 'react-router-dom'
import {IoMdLogOut} from 'react-icons/io'
import Cookies from 'js-cookie'

const Navbar = props => {
  const logutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('./login')
  }
  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740494566/Vector_anoy5d.png"
          alt="website logo"
          className="logo-img"
        />
      </Link>

      <ul style={{marginRight: '20px'}}>
        <li style={{listStyleType: 'none', display: 'flex'}}>
          <button onClick={logutButton} type="button" className="logout-button">
            <IoMdLogOut size="25" />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Navbar)

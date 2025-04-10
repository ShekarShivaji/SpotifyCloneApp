import './index.css'
import {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMSg: '',
    showSubmitError: false,
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordName = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailuar = errorMSg => {
    this.setState({errorMSg, showSubmitError: true})
  }

  submitForm = async Event => {
    Event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailuar(data.error_msg)
    }
  }

  renderUserField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          className="username-input-field"
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className="username-input-field"
          onChange={this.onChangePasswordName}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMSg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <div className="form-container">
          <img
            src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740494566/Vector_anoy5d.png"
            className="login-website-logo-image"
            alt="login website logo"
          />
          <h1 className="spotify-heading">Spotify Remix</h1>
          <form onSubmit={this.submitForm} className="form-container">
            <div className="input-container">{this.renderUserField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>

          {showSubmitError && <p className="error-msg">* {errorMSg}</p>}
        </div>
      </div>
    )
  }
}

export default withRouter(LoginRoute)

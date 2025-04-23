import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoutes = ({component: Component, ...rest}) => {
  const jwtToken = Cookie.get('jwt_token')
  return jwtToken === undefined ? (
    <Redirect to="/login" />
  ) : (
    <Route {...rest} component={Component} />
  )
}

export default ProtectedRoutes

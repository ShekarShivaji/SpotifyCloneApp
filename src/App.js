import './App.css'
import {Redirect, Switch, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginRoute from './components/LoginRoute'
import ProtectedRoutes from './components/ProtectedRoutes'
import HomeRoute from './components/HomeRoute'
import NotFound from './components/NotFound'
import SpecificPlaylistDetailsRoute from './components/SpecificPlaylistDetailsRoute'
import CategoryPlaylistsDetailsRoute from './components/CategoryPlaylistsDetailsRoute'
import AlbumDetailsRoute from './components/AlbumDetailsRoute'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <Route
      exact
      path="/"
      render={() =>
        Cookies.get('jwt_token') ? <HomeRoute /> : <Redirect to="/login" />
      }
    />
    <ProtectedRoutes
      exact
      path="/playlist/:id"
      component={SpecificPlaylistDetailsRoute}
    />
    <ProtectedRoutes
      exact
      path="/category/:id/playlists"
      component={CategoryPlaylistsDetailsRoute}
    />
    <ProtectedRoutes exact path="/album/:id" component={AlbumDetailsRoute} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App

import './App.css'
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom'
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
  <div className="bg-container">
    <BrowserRouter>
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
          path="/playlists-details/:id"
          component={SpecificPlaylistDetailsRoute}
        />
        <ProtectedRoutes
          exact
          path="/category-playlists/:categoryId"
          component={CategoryPlaylistsDetailsRoute}
        />
        <ProtectedRoutes
          exact
          path="/new-releases/album/:id"
          component={AlbumDetailsRoute}
        />
        <Route path="/bad-path" component={NotFound} />
        <Redirect to="/bad-path" />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App

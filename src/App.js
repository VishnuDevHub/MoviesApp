import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import MovieItemDetails from './components/MovieItemDetails'
import Account from './components/Account'
import Popular from './components/Popular'
import Search from './components/Search'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/not-found" component={NotFound} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={Search} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App

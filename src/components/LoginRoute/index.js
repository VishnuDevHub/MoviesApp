import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isErrorShown: false,
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken.jwt_token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetailsObj = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetailsObj),
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const jsonData = await response.json()
      this.onSuccessLogin(jsonData)
    } else {
      const jsonData = await response.json()
      this.setState({isErrorShown: true, errorMsg: jsonData.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg, isErrorShown} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-bg-container">
        <img
          src="https://res.cloudinary.com/dpkto4v7o/image/upload/v1703505638/Group_7399_c8ewg8.png"
          alt="login website logo"
          className="logo-img"
        />
        <div className="login-card-container">
          <form className="login-card" onSubmit={this.onSubmitCredentials}>
            <h1 className="login-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="userName" className="label-el">
                USERNAME
              </label>
              <input
                type="text"
                className="input-text"
                placeholder="Enter Username"
                onChange={this.onChangeUserName}
                id="userName"
                value={username}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-el">
                PASSWORD
              </label>
              <input
                type="password"
                className="input-text"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                id="password"
                value={password}
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
            {isErrorShown && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm

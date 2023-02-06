import {Component} from 'react'
import Cookies from 'js-cookie'
import './login.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    errorStatus: true,
  }

  getJob = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const jobCredentials = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(jobCredentials),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({errorMsg: errorMessage})
  }

  // enter a username
  enterUsername = event => {
    this.setState({username: event.target.value})
  }

  // enter a password
  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMsg, errorStatus} = this.state
    console.log(errorMsg)
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.getJob}>
            <div>
              <label htmlFor="userName">USERNAME</label>
              <input id="userName" type="text" onChange={this.enterUsername} />
            </div>
            <div>
              <label htmlFor="passWord">PASSWORD</label>
              <input
                id="passWord"
                type="password"
                onChange={this.enterPassword}
              />
            </div>
            <button type="submit">Login</button>
            {errorStatus && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login

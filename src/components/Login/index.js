import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUserName = event => this.setState({username: event.target.value})

  renderUserNameFeild = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input-feild"
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUserName}
          placeholder="Username"
        />
      </>
    )
  }

  onChangePassword = event => this.setState({password: event.target.value})

  renderPasswordFeild = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input-feild"
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => this.setState({errorMsg, showError: true})

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const respose = await fetch(url, options)
    const data = await respose.json()
    if (respose.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {showError, errorMsg} = this.state

    return (
      <div className="LoginPage-container">
        <form className="login-form-container" onSubmit={this.submitForm}>
          <img
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input-container">{this.renderUserNameFeild()}</div>
          <div className="input-container">{this.renderPasswordFeild()}</div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {showError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login

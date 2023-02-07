import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './header.css'

const Header = props => {
  console.log('header')
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ul className="unordered-list">
      <Link to="/" className="wl-css">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="hj-css">
        <li>
          <Link to="/">
            <h1 className="home-heading">Home</h1>
          </Link>
        </li>
        <li>
          <Link to="/job">
            <h1 className="job-heading">Jobs</h1>
          </Link>
        </li>
      </div>
      <li>
        <button
          type="button"
          onClick={onClickLogOut}
          data-testid="searchButton"
          className="header-button"
        >
          Logout
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)

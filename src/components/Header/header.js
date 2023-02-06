import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  console.log('header')
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ul>
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <li>
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </li>
      <li>
        <Link to="/job">
          <h1>Jobs</h1>
        </Link>
      </li>
      <li>
        <button
          type="button"
          onClick={onClickLogOut}
          data-testid="searchButton"
        >
          Logout
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)

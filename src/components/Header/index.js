import './index.css'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="header-logo-img"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="mobile-tab-list">
        <li className="mobile-tab-item">
          <Link to="/">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li className="mobile-tab-item">
          <Link to="/jobs">
            <BsFillBriefcaseFill className="icon" />
          </Link>
        </li>
        <li className="mobile-tab-item">
          <button
            className="logout-btn"
            type="button"
            aria-label=""
            onClick={onLogout}
          >
            <FiLogOut className="icon" />
          </button>
        </li>
      </ul>
      <div className="tab-list">
        <Link className="tab-link" to="/">
          <p className="tab-text">Home</p>
        </Link>
        <Link className="tab-link" to="/jobs">
          <p className="tab-text">Jobs</p>
        </Link>
      </div>
      <button
        type="button"
        className="logout-btn logout-lg-btn"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)

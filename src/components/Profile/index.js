import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Profile extends Component {
  state = {profileDetails: {}, apiStatus: '', showRetryBtn: ''}

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      this.setState({apiStatus: true})
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({profileDetails: updatedProfileDetails})
    } else {
      console.log('Error')
      this.setState({apiStatus: false, showRetryBtn: true})
    }
  }

  componentDidMount = () => this.getProfileDetails()

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <>
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </>
    )
  }

  onClickRetry = () => this.getProfileDetails()

  render() {
    const {apiStatus, showRetryBtn} = this.state
    if (apiStatus === true) {
      return (
        <div className="profile-container">{this.renderProfileDetails()}</div>
      )
    }
    return (
      <div className="retry-div">
        {showRetryBtn && (
          <button
            className="retry-btn"
            type="button"
            onClick={this.onClickRetry}
          >
            Retry
          </button>
        )}
      </div>
    )
  }
}

export default Profile

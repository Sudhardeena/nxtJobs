import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConsts = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], apiStatus: apiStatusConsts.initial}

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConsts.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        title: jobDetails.title,
      }

      const updatedSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        apiStatus: apiStatusConsts.success,
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConsts.failure})
    }
  }

  componentDidMount = () => this.getJobDetails()

  onSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <>
        <div className="job-card-item">
          <div className="primary-info">
            <img
              className="compony-img"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="role-info">
              <h1 className="role-name">{title}</h1>
              <p className="rating">⭐ {rating}</p>
            </div>
          </div>
          <div className="secondary-info">
            <div className="loc-time-details">
              <MdLocationOn className="location-icon icon" />
              <p>{location}</p>
              <BsFillBriefcaseFill className="work-time-icon icon" />
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="hr-rule" />
          <div className="description-div">
            <h1 className="desc-h1">Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
          </div>
          <p className="job-desc">{jobDescription}</p>
          <h1 className="desc-h1">Skills</h1>
          <ul className="skills-list">
            {skills.map(each => (
              <li className="skill-item" key={each.name}>
                <img
                  className="skill-img"
                  src={each.imageUrl}
                  alt={each.name}
                />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company">
            <div>
              <h1 className="desc-h1">Life at Company</h1>
              <p className="job-desc">{lifeAtCompany.description}</p>
            </div>
            <img
              className="life-at-company-img"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="role-name">Similar Jobs</h1>
        <ul className="similar-job-list">
          {similarJobs.map(each => (
            <li className="job-card-item similar-job-item" key={each.id}>
              <div className="primary-info">
                <img
                  className="compony-img"
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                />
                <div className="role-info">
                  <h1 className="role-name">{each.title}</h1>
                  <p className="rating">⭐ {each.rating}</p>
                </div>
              </div>

              <h1 className="desc-h1">Description</h1>
              <p className="job-desc">{each.jobDescription}</p>
              <div className="loc-time-details">
                <MdLocationOn className="location-icon" />
                <p>{each.location}</p>
                <BsFillBriefcaseFill className="work-time-icon" />
                <p>{each.employmentType}</p>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  onFailureView = () => (
    <>
      <img
        className="result-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="result-h1">Oops! Something Went Wrong</h1>
      <p className="result-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </>
  )

  onClickRetry = () => this.getJobDetails()

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderPossibleViewa = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConsts.success:
        return this.onSuccessView()
      case apiStatusConsts.failure:
        return this.onFailureView()
      case apiStatusConsts.inProgress:
        return this.inProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-page">
        <Header />
        <div className="job-details-body">{this.renderPossibleViewa()}</div>
      </div>
    )
  }
}

export default JobDetails

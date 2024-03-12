import './index.css'
import {Link} from 'react-router-dom'

import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobCardDetails

  return (
    <Link className="job-card-link" to={`/jobs/${id}`}>
      <li className="job-card-item">
        <div className="primary-info">
          <img
            className="compony-img"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="role-info">
            <h1 className="role-name">{title}</h1>
            <p className="rating">⭐ {rating}</p>
          </div>
        </div>
        <div className="secondary-info">
          <div className="loc-time-details">
            <MdLocationOn className="location-icon" />
            <p>{location}</p>
            <BsFillBriefcaseFill className="work-time-icon" />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="hr-rule" />
        <h1 className="desc-h1">Description</h1>
        <p className="job-desc">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard

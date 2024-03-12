import './index.css'

import JobCard from '../JobCard'

const JobsList = props => {
  const successView = () => {
    const {jobList} = props
    console.log(jobList)

    if (jobList.length === 0) {
      return (
        <>
          <img
            className="result-img"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="result-h1">No Jobs Found</h1>
          <p className="result-desc">
            We could not find any jobs. Try other filters.
          </p>
        </>
      )
    }
    return (
      <uL className="job-list">
        {jobList.map(each => (
          <JobCard jobCardDetails={each} key={each.id} />
        ))}
      </uL>
    )
  }

  return <div className="joblist-possible-view-container">{successView()}</div>
}

export default JobsList

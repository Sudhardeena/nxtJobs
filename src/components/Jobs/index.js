import './index.css'
import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'
import EmployTypeItem from '../EmployTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'
import JobsList from '../JobsList'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConsts = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    jobList: [],
    apiStatus: apiStatusConsts.initial,
    salaryRange: '',
    employmentType: [],
  }

  componentDidMount = () => this.getJoblist()

  getJoblist = async () => {
    this.setState({apiStatus: apiStatusConsts.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, salaryRange, searchInput} = this.state
    const employmentTypeString = employmentType.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${salaryRange}&search=${searchInput}`
    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response.ok)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({apiStatus: apiStatusConsts.success, jobList: updatedData})
    } else {
      this.setState({apiStatus: apiStatusConsts.failure})
    }
  }

  onClickRetry = () => this.getJoblist()

  onSuccessView = () => {
    const {jobList} = this.state
    return <JobsList jobList={jobList} />
  }

  inProgressView = () => (
    <div data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  onFailureView = () => (
    <>
      <img
        className='result-img'
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
      />
      <h1 className='result-h1'>Oops! Something Went Wrong</h1>
      <p className='result-desc'>
        We cannot seem to find the page yor are looking for
      </p>
      <button className='retry-btn' type='button' onClick={this.onClickRetry}>
        Retry
      </button>
    </>
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

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className='search-input-div'>
        <input
          className='search-input'
          type='search'
          placeholder='Search'
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          className='search-btn'
          type='button'
          data-testid='searchButton'
          aria-label='search'
          onClick={this.onSearch}
        >
          <BsSearch className='search-icon' />
        </button>
      </div>
    )
  }

  renderLaptopSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className='search-laptop-input-div'>
        <input
          className='search-input'
          type='search'
          placeholder='Search'
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          className='search-btn'
          type='button'
          data-testid='searchButton'
          aria-label='search'
          onClick={this.onSearch}
        >
          <BsSearch className='search-icon' />
        </button>
      </div>
    )
  }

  renderEmploymentTypesList = () => (
    <ul className='sort-list'>
      {employmentTypesList.map(each => (
        <EmployTypeItem
          key={each.employmentTypeId}
          employItemDetails={each}
          onFilteremployment={this.onFilteremployment}
        />
      ))}
    </ul>
  )

  renderSalaryRangeList = () => (
    <ul className='sort-list'>
      {salaryRangesList.map(each => (
        <SalaryRangeItem
          key={each.salaryRangeId}
          salaryItemDetails={each}
          onFilterSalary={this.onFilterSalary}
        />
      ))}
    </ul>
  )

  onSearch = () => this.getJoblist()

  onFilterSalary = minSalary => {
    this.setState({salaryRange: minSalary}, this.getJoblist)
  }

  onFilteremployment = employmentTypeclicked => {
    const {employmentType} = this.state
    if (employmentType.includes(employmentTypeclicked)) {
      const removedEmploymentList = employmentType.filter(
        each => each !== employmentTypeclicked,
      )
      this.setState({employmentType: removedEmploymentList}, this.getJoblist)
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, employmentTypeclicked],
        }),
        this.getJoblist,
      )
    }
  }

  render() {
    return (
      <div className='Jobs-page-container'>
        <Header />
        <div className='jobs-page-body'>
          <div className='profile-filter-div'>
            {this.renderSearchInput()}
            <Profile />
            <hr className='hr-rule' />
            <h1 className='filter-list-heading'>Type of Employment</h1>
            {this.renderEmploymentTypesList()}
            <hr className='hr-rule' />
            <h1 className='filter-list-heading'>Salary Range</h1>
            {this.renderSalaryRangeList()}
          </div>
          <div className='job-list-container'>
            {this.renderLaptopSearchInput()}
            {this.renderPossibleViewa()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

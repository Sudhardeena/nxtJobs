import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-page-container">
    <Header />
    <div className="home-body">
      <div className="content-div">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-desc">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="find-jobs-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home

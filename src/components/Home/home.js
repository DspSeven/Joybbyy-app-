// import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header/header'
import './home.css'

const Home = () => {
  console.log('home')
  return (
    <div className="home-container">
      <Header />
      <div className="bg-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="para-heading">
          Millions of people are searching for jobs, salary information, <br />
          company reviews. Find the jobs that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button type="button" className="home-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home

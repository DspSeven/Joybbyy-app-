// import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header/header'

// import './home.css'

const Home = () => {
  console.log('home')
  return (
    <div>
      <Header />
      <div>
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the jobs that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button type="button">Find Jobs</button>
        </Link>
      </div>
    </div>
  )
}
export default Home

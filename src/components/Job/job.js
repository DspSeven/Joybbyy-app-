import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiSearchAlt2} from 'react-icons/bi'
import FilterGroup from '../FilterGroup/filter'
import JobData from '../JobData/jobs'
import Header from '../Header/header'
// import './job.css'

const jobConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Job extends Component {
  state = {
    employmentType: [],
    salaryPackage: '',
    search: '',
    apiStatus: jobConstants.initial,
    employmentList: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: jobConstants.inProgress})
    const {employmentType, salaryPackage, search} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryPackage}&search=${search}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      console.log(updatedData)
      this.setState({
        employmentList: updatedData,
        apiStatus: jobConstants.success,
      })
    } else {
      this.setState({apiStatus: jobConstants.failure})
    }
  }

  onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  header = () => {
    console.log('header')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <div>
          <h1>Home</h1>
          <h1>Jobs</h1>
        </div>
        <button
          type="button"
          onClick={this.onClickLogOut}
          data-testid="searchButton"
        >
          Logout
        </button>
      </div>
    )
  }

  // enter label
  sendLabel = (label, status) => {
    console.log(label)
    /*
    switch (label) {
      case 'FULLTIME':
        return this.setState({fulltime: 'FULLTIME'}, this.getJobDetails)
      case 'PARTTIME':
        return this.setState({parttime: 'PARTTIME'}, this.getJobDetails)
      case 'FREELANCER':
        return this.setState({freelancer: 'FREELANCE'}, this.getJobDetails)
      case 'INTERNSHIP':
        return this.setState({internship: 'INTERNSHIP'}, this.getJobDetails)
      default:
        return null
    }
    */
    if (status === false) {
      const {employmentType} = this.state
      const index = employmentType.indexOf(label)
      const newArray = employmentType.splice(index, 1)
      console.log(employmentType)
      this.setState({employmentType}, this.getJobDetails)
    } else {
      this.setState(
        prevState => ({employmentType: [...prevState.employmentType, label]}),
        this.getJobDetails,
      )
    }
  }

  // enter salary
  sendSalary = salary => {
    console.log(salary)
    this.setState({salaryPackage: salary}, this.getJobDetails)
  }

  // enter search
  enterSearchKey = event => {
    this.setState({search: event.target.value}, this.getJobDetails)
  }

  // renderLoader
  renderLoader = () => {
    console.log('loader')
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#000000" height="50" width="50" />
      </div>
    )
  }

  // renderData
  renderData = () => {
    const {employmentList} = this.state
    return (
      <ul>
        {employmentList.map(data => (
          <JobData jobDetails={data} key={data.id} />
        ))}
      </ul>
    )
  }

  noJobsView = () => {
    console.log('no-jon')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  // successView
  successView = () => {
    const {employmentList} = this.state
    const employsData = employmentList.length > 0
    return <div>{employsData ? this.renderData() : this.noJobsView()}</div>
  }

  // failureView
  failureView = () => {
    console.log('failure')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>"Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button">Retry</button>
      </div>
    )
  }

  // start switch
  startSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobConstants.success:
        return this.successView()
      case jobConstants.failure:
        return this.failureView()
      case jobConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {search} = this.state
    return (
      <div>
        <Header />
        <FilterGroup sendLabel={this.sendLabel} sendSalary={this.sendSalary} />
        <div>
          <div>
            <input
              type="search"
              onChange={this.enterSearchKey}
              value={search}
            />
            <BiSearchAlt2 />
          </div>
          <div>{this.startSwitch()}</div>
        </div>
      </div>
    )
  }
}
export default Job

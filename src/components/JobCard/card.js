import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiTwotoneStar} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import {BiLocationPlus} from 'react-icons/bi'
import {FiExternalLink} from 'react-icons/fi'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import SimilarJob from '../SimilarJob/sim'
import NotFound from '../NotFound/notFound'
import Header from '../Header/header'

const jobConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobCard extends Component {
  state = {
    apiStatus: jobConstants.initial,
    jobSource: [],
  }

  componentDidMount() {
    this.getSpecificJob()
  }

  getSpecificJob = async () => {
    this.setState({apiStatus: jobConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const multiArrayUpdatedData = {
        jobDetails: data.job_details,
        similarJob: data.similar_jobs,
      }
      const {jobDetails, similarJob} = multiArrayUpdatedData
      const jobSpecificData = {
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
        skills: jobDetails.skills.map(skill => ({
          imageUrl: skill.image_url,
          name: skill.name,
        })),
        title: jobDetails.title,
        similarJobs: similarJob.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          rating: job.rating,
          title: job.title,
        })),
      }
      console.log(jobSpecificData)
      this.setState({
        jobSource: jobSpecificData,
        apiStatus: jobConstants.success,
      })
    } else {
      this.setState({apiStatus: jobConstants.failure})
    }
  }

  // log out
  onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  // header
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
        <button type="button" onClick={this.onClickLogOut}>
          Logout
        </button>
      </div>
    )
  }

  // successView
  successView = () => {
    const {jobSource} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      title,
      rating,
      location,
      skills,
      lifeAtCompany,
      packagePerAnnum,
      similarJobs,
    } = jobSource
    const {description, imageUrl} = lifeAtCompany
    return (
      <div>
        <div>
          <div>
            <img src={companyLogoUrl} alt="company_logo_url" />
            <div>
              <h1>{title}</h1>
              <div>
                <AiTwotoneStar />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <BiLocationPlus />
              <p>{location}</p>
            </div>
            <div>
              <BsFillPersonFill />
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>
              Visit
              <span>
                <FiExternalLink />
              </span>
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          {skills.map(skill => (
            <div key={skill.name}>
              <img src={skill.imageUrl} alt={skill.name} />
              <p>{skill.name}</p>
            </div>
          ))}
          <h1>Life at Company</h1>
          <div>
            <p>{description}</p>
            <img src={imageUrl} alt="company" />
          </div>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobs.map(jobby => (
              <SimilarJob key={jobby.id} jobDoc={jobby} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // failureView
  failureView = () => {
    console.log('failure')
    return <Redirect to="/not-found" />
  }

  // renderLoader
  renderLoader = () => {
    console.log('loader')
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#000000" height="50" width="50" />
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
    return (
      <div>
        <Header />
        {this.startSwitch()}
      </div>
    )
  }
}
export default JobCard

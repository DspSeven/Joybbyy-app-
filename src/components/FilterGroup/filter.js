import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

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

const filtersConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FilterGroup extends Component {
  state = {
    profileInfo: {},
    profileStatus: filtersConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileStatus: filtersConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileInfo: updatedData,
        profileStatus: filtersConstants.success,
      })
    } else {
      this.setState({profileStatus: filtersConstants.failure})
    }
  }

  // success view
  successView = () => {
    const {profileInfo} = this.state
    const {name, profileImageUrl, shortBio} = profileInfo
    return (
      <div>
        <img src={profileImageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  restart = () => {
    this.getProfile()
  }

  // failure view
  failureView = () => {
    console.log('retry')
    return (
      <div>
        <button type="button" onClick={this.restart}>
          Retry
        </button>
      </div>
    )
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

  // started switch
  startSwitch = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case filtersConstants.success:
        return this.successView()
      case filtersConstants.failure:
        return this.failureView()
      case filtersConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  sendLabels = event => {
    const {sendLabel} = this.props
    const id = document.getElementById(event.target.value)
    if (id.checked) {
      sendLabel(event.target.value, true)
    } else {
      sendLabel(event.target.value, false)
    }
  }

  senSalaries = event => {
    const {sendSalary} = this.props
    sendSalary(event.target.value)
  }

  render() {
    return (
      <div>
        {this.startSwitch()}
        <hr />
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypesList.map(emp => (
            <li>
              <input
                type="checkbox"
                id={emp.employmentTypeId}
                value={emp.employmentTypeId}
                onClick={this.sendLabels}
              />
              <label htmlFor={emp.employmentTypeId}>{emp.label}</label>
            </li>
          ))}
        </ul>
        <hr />
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map(salary => (
            <li>
              <input
                type="radio"
                id={salary.salaryRangeId}
                name="label"
                value={salary.salaryRangeId}
                onClick={this.senSalaries}
              />
              <label htmlFor={salary.salaryRangeId} name="label">
                {salary.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default FilterGroup

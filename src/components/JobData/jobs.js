import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {BsFillPersonFill} from 'react-icons/bs'
import './jobs.css'

const JobData = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="jobs-container">
      <Link to={`jobs/${id}`} className="job-bg-container">
        <div className="sec-con">
          <div className="netflix-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo-img"
            />
            <div className="netflix-show">
              <h1 className="netflix-heading">{title}</h1>
              <div className="star-container">
                <AiFillStar className="star-icon" />
                <p className="star-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="netflix-address">
            <div className="location">
              <ImLocation2 className="location-1" />
              <p className="location-2">{location}</p>
            </div>
            <div className="person">
              <BsFillPersonFill className="person-1" />
              <p className="person-2">{employmentType}</p>
            </div>
            <div>
              <p className="person-2">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="netflix-story">
            <h1 className="ns-1">Description</h1>
            <p className="ns-2">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default JobData

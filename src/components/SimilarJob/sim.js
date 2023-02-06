import {AiTwotoneStar} from 'react-icons/ai'
import {BiLocationPlus} from 'react-icons/bi'
import {BsFillPersonFill} from 'react-icons/bs'

const SimilarJob = props => {
  const {jobDoc} = props
  const {
    companyLogoUrl,

    employmentType,
    id,
    jobDescription,
    title,
    rating,
    location,
  } = jobDoc
  return (
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
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div>
        <div>
          <BiLocationPlus />
          <p>{location}</p>
        </div>
        <div>
          <BsFillPersonFill />
          <p>{employmentType}</p>
        </div>
      </div>
    </div>
  )
}
export default SimilarJob

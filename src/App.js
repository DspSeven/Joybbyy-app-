import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home/home'
import Login from './components/Login/login'
import ProtectedRoute from './components/ProtectedRoute/index'
import Job from './components/Job/job'
import JobCard from './components/JobCard/card'
import NotFound from './components/NotFound/notFound'
import './App.css'

/* These are the lists used in the application. You can move them to any component needed.
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
*/

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Job} />
      <ProtectedRoute exact path="/jobs/:id" component={JobCard} />
      <NotFound />
    </Switch>
  </BrowserRouter>
)

export default App

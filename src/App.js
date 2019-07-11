import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

const Home = props => <div>home</div>

function App (props) {
  return (
    <Switch>
      <Route strict sensitive path='/' component={Home} />
      {/* <Redirect push from='/' to='/home' /> */}
    </Switch>
  )
}

export default hot(module)(withRouter(App))

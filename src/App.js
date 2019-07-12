import React, { useState } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

// Components
import Layout from './js/components/Layout'

const Home = props => <div>home</div>

function App (props) {
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(true)

  return (
    <Layout height='100vh'>
      <Layout.Content style={{ background: 'pink' }}>
        <Switch>
          <Route strict sensitive path='/' component={Home} />
          {/* <Redirect push from='/' to='/home' /> */}
        </Switch>
      </Layout.Content>
      <Layout.Sider isCollapsed={isSiderCollapsed} collapsedWidth={82} width={600}>
        <button onClick={event => setIsSiderCollapsed(!isSiderCollapsed)}>click me!</button>
        aaa
      </Layout.Sider>
    </Layout>
  )
}

export default hot(module)(withRouter(App))

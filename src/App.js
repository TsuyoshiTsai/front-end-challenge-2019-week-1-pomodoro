import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import classnames from 'classnames/bind'

// Components
import Icon from './js/components/Icon'
import Layout from './js/components/Layout'
import Menu from './js/components/Menu'

// Images
import TomatoSVG from './assets/images/icons/Tomato.svg'

// Style
import styles from './style.module.scss'

// Variables / Functions
const loading = () => null
const RingTone = Loadable({ loader: () => import('./js/views/RingTone'), loading })
const TaskAdd = Loadable({ loader: () => import('./js/views/TaskAdd'), loading })
const TaskAnalytics = Loadable({ loader: () => import('./js/views/TaskAnalytics'), loading })
const TaskList = Loadable({ loader: () => import('./js/views/TaskList'), loading })
const cx = classnames.bind(styles)
const navigations = [
  {
    path: 'task/add',
    icon: { name: 'plus', mode: '01' },
    component: TaskAdd,
  },
  {
    path: 'task/list',
    icon: { name: 'hamburger', mode: '01' },
    component: TaskList,
  },
  {
    path: 'task/analytics',
    icon: { name: 'line-chart', mode: '01' },
    component: TaskAnalytics,
  },
  {
    path: 'ring-tone',
    icon: { name: 'ring-note', mode: '01' },
    component: RingTone,
  },
]

export const propTypes = {
  match: PropTypes.object,
}

function App (props) {
  const { match } = props

  const [isSiderCollapsed, setIsSiderCollapsed] = useState(true)

  return (
    <Layout className={cx('app')} height='100vh'>
      <Layout.Content style={{ background: 'pink' }}>clock</Layout.Content>

      <Layout.Sider className={cx('app__sider')} isCollapsed={isSiderCollapsed} collapsedWidth={80} width={600}>
        <button className={cx('app__sider-collapse-toggler')} onClick={event => setIsSiderCollapsed(!isSiderCollapsed)}>
          <img src={TomatoSVG} alt='tomato' />
          <Icon name='arrow-right' mode='01' flipped={isSiderCollapsed ? 'horizontally' : 'vertically'} />
        </button>

        <Menu className={cx('app__sider-menu')}>
          {navigations.map(({ path, icon }, index) => (
            <Menu.Item key={index} onClick={isSiderCollapsed ? event => setIsSiderCollapsed(false) : null}>
              <Menu.Link to={`${match.url}${path}`}>
                <Icon name={icon.name} mode={icon.mode} />
              </Menu.Link>
            </Menu.Item>
          ))}
        </Menu>

        <main className={cx('app__sider-main')} style={{ opacity: isSiderCollapsed ? 0 : 1, visibility: isSiderCollapsed ? 'hidden' : 'visible' }}>
          <Switch>
            {navigations.map(({ path, component }, index) => (
              <Route key={index} strict sensitive path={`${match.url}${path}`} component={component} />
            ))}
            <Redirect replace from={match.url} to={`${match.url}${navigations[0].path}`} />
          </Switch>
        </main>
      </Layout.Sider>
    </Layout>
  )
}

App.propTypes = propTypes

export default hot(module)(withRouter(App))

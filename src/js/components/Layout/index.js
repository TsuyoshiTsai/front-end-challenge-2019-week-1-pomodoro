import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Content from './components/Content'
import Header from './components/Header'
import Sider from './components/Sider'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  hasSider: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
}

function Layout (props) {
  const { hasSider: propsHasSider, height, style, className, children, ...restProps } = props

  const hasSider = propsHasSider || React.Children.map(children, child => child.type.displayName === Sider.displayName).filter(Boolean).length > 0

  return (
    <section className={cx('layout', className)} style={{ ...style, height }} data-has-sider={hasSider} role='layout' {...restProps}>
      {children}
    </section>
  )
}

Layout.propTypes = propTypes

Layout.Content = Content
Layout.Header = Header
Layout.Sider = Sider

export default Layout

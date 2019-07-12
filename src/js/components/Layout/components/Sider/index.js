import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Spring } from 'react-spring/renderprops'

// Components

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isCollapsible: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  collapsedWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onCollapse: PropTypes.func,
  collapseEvent: PropTypes.oneOf(['onClick', 'onMouseEnter']),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {
  isCollapsible: true,
  collapsedWidth: 70,
  width: 220,
}

function Sider (props) {
  const {
    isCollapsible,
    isCollapsed: propIsCollapsed,
    defaultCollapsed,
    collapsedWidth,
    width,
    onCollapse: propOnCollapse,
    collapseEvent,
    style,
    className,
    children,
    ...restProps
  } = props

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed || propIsCollapsed || false)

  useEffect(() => {
    if (propIsCollapsed !== isCollapsed) {
      setIsCollapsed(propIsCollapsed)
    }
  }, [isCollapsed, propIsCollapsed])

  // Events
  const onCollapse = event => {
    const newIsCollapsed = !isCollapsed

    setIsCollapsed(newIsCollapsed)

    if (typeof propOnCollapse === 'function') {
      propOnCollapse(event, newIsCollapsed)
    }
  }

  return (
    <Spring to={{ width: isCollapsible && isCollapsed ? collapsedWidth : width }} config={{ tension: 500, friction: 36 }}>
      {springProps => (
        <aside
          className={cx('layout-sider', className)}
          style={{ width: isCollapsible ? collapsedWidth : width, ...style, ...springProps }}
          {...Object.assign(typeof collapseEvent === 'undefined' ? {} : { [collapseEvent]: isCollapsible ? onCollapse : null }, restProps)}
        >
          {children}
        </aside>
      )}
    </Spring>
  )
}

Sider.displayName = 'Layout.Sider'
Sider.propTypes = propTypes
Sider.defaultProps = defaultProps

export default Sider

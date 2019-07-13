import React from 'react'
import PropTypes from 'prop-types'
import { Spring, animated } from 'react-spring/renderprops'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Fuctions
const cx = classnames.bind(styles)

export const propTypes = {
  isCollapsed: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

function Collapsible (props) {
  const { isCollapsed, style, className, children, ...restProps } = props

  return (
    <Spring
      native
      to={{
        height: isCollapsed ? 0 : 'auto',
        opacity: isCollapsed ? 0 : 1,
        top: isCollapsed ? -20 : 0,
      }}
    >
      {props => (
        <animated.div className={cx('collapse-collapsible', className)} style={{ ...style, ...props }} {...restProps}>
          {children}
        </animated.div>
      )}
    </Spring>
  )
}

Collapsible.propTypes = propTypes

export default Collapsible

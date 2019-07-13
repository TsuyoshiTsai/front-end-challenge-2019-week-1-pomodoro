import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Icon from '../../../../../Icon'

// Style
import styles from './style.module.scss'

// Variables / Fuctions
const cx = classnames.bind(styles)

export const propTypes = {
  isCollapsible: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

function Header (props) {
  const { isCollapsible, isCollapsed, className, children, ...restProps } = props

  return (
    <div className={cx('collapse-panel-header', className)} data-is-collapsible={isCollapsible} {...restProps}>
      {children}
      {isCollapsible && <Icon name='chevron-right' mode='01' rotated={isCollapsed ? undefined : 'clockwise'} className={cx('collapse-panel-header__icon')} />}
    </div>
  )
}

Header.propTypes = propTypes

export default Header

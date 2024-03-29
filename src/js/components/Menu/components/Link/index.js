import React from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = NavLink.propTypes

function Link (props) {
  const { className, activeClassName, ...restProps } = props

  return <NavLink className={cx('menu-link', className)} activeClassName={cx('menu-link--active', activeClassName)} {...restProps} />
}

Link.propTypes = propTypes

export default Link

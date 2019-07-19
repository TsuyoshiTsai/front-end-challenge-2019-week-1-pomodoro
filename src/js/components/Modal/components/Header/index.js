import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Styles
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  style: PropTypes.string,
  className: PropTypes.string,
}

export const defaultProps = {
  align: 'center',
}

function Header (props) {
  const { align, style, className, ...restProps } = props

  return <header className={cx('modal-header', className)} style={{ justifyContent: align, ...style }} {...restProps} />
}

Header.displayName = 'Modal.Header'
Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header

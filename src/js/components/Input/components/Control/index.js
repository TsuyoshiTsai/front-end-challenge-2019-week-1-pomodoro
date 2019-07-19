import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isBlock: PropTypes.bool,
  className: PropTypes.string,
}

export const defaultProps = {}

function Control (props) {
  const { isBlock, className, ...restProps } = props

  return <span className={cx('input-control', className)} data-is-block={isBlock} {...restProps} />
}

Control.propTypes = propTypes
Control.defaultProps = defaultProps

export default Control

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
}

export const defaultProps = {
  type: 'radio',
}

function Input (props) {
  const { className, ...restProps } = props

  return <input className={cx('radio-input', className)} role='radio-input' {...restProps} />
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input

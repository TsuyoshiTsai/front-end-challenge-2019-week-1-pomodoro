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

export const defaultProps = {
  isBlock: true,
}

function Label (props) {
  const { isBlock, className, ...restProps } = props

  return <label className={cx('form-label', className)} data-is-block={isBlock} {...restProps} />
}

Label.propTypes = propTypes
Label.defaultProps = defaultProps

export default Label

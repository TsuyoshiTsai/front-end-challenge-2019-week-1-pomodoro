import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

function Label (props) {
  const { checked, disabled, className, ...restProps } = props

  return <label className={cx('radio-label', className)} role='radio-label' data-is-checked={checked} disabled={disabled} {...restProps} />
}

Label.propTypes = propTypes

export default Label

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Typography from '../Typography'

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
  marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  level: 'h1',
  marginBottom: '0.25em',
}

function Title (props) {
  const { level, marginTop, marginBottom, style, className, ...restProps } = props

  return (
    <Typography
      element={level}
      data-level={level}
      style={{ ...style, marginTop, marginBottom }}
      className={cx('typography-title', className)}
      {...restProps}
    />
  )
}

Title.propTypes = propTypes
Title.defaultProps = defaultProps

export default Title

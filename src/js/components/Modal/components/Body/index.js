import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Styles
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  forwardRef: PropTypes.any,
}

export const defaultProps = {
  align: 'center',
  padding: `0 75px`,
}

function Body (props) {
  const { align, padding, className, forwardRef, style, ...restProps } = props

  return <section className={cx('modal-body', className)} style={{ justifyContent: align, padding, ...style }} {...restProps} />
}

Body.propTypes = propTypes
Body.defaultProps = defaultProps

export default Body

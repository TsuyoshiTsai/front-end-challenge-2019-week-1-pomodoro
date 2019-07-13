import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isFlexbox: PropTypes.bool,
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  marginBottom: 25,
}

function Group (props) {
  const { isFlexbox, marginBottom, style, className, ...restProps } = props

  return <div className={cx('form-group', className)} data-is-flexbox={isFlexbox} style={{ marginBottom, ...style }} {...restProps} />
}

Group.propTypes = propTypes
Group.defaultProps = defaultProps

export default Group

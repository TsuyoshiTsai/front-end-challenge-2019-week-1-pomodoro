import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isFlexbox: PropTypes.bool,
  withMarginBottom: PropTypes.bool,
  className: PropTypes.string,
}

export const defaultProps = {}

function Group (props) {
  const { isFlexbox, withMarginBottom, className, ...restProps } = props

  return <div className={cx('form-group', className)} data-is-flexbox={isFlexbox} data-with-margin-bottom={withMarginBottom} {...restProps} />
}

Group.propTypes = propTypes
Group.defaultProps = defaultProps

export default Group

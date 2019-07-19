import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Icon from '../Icon'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  type: PropTypes.oneOf(['primary']).isRequired,
  wrapperProps: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  type: 'primary',
}

function Wrapped (props) {
  const { type, wrapperProps = {}, className, ...restProps } = props

  return (
    <span data-type={type} className={cx('icon-wrapped', className)} {...wrapperProps}>
      <Icon {...restProps} />
    </span>
  )
}

Wrapped.propTypes = propTypes
Wrapped.defaultProps = defaultProps

export default Wrapped

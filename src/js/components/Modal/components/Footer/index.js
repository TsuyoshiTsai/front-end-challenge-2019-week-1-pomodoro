import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Styles
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  align: 'center',
}

function Footer (props) {
  const { align, style, className, ...restProps } = props

  return <footer className={cx('modal-footer', className)} style={{ justifyContent: align, ...style }} {...restProps} />
}

Footer.displayName = 'Modal.Footer'
Footer.propTypes = propTypes
Footer.defaultProps = defaultProps

export default Footer

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

function Footer (props) {
  const { className, ...restProps } = props

  return <footer className={cx('layout-footer', className)} role='layout-footer' {...restProps} />
}

Footer.propTypes = propTypes

export default Footer

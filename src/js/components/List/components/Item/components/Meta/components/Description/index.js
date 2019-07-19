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

function Description (props) {
  const { className, ...restProps } = props

  return <div className={cx('list-item-meta-description', className)} {...restProps} />
}

Description.propTypes = propTypes

export default Description

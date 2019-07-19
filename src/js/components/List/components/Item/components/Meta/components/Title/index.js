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

function Title (props) {
  const { className, ...restProps } = props

  return <h3 className={cx('list-item-meta-title', className)} {...restProps} />
}

Title.propTypes = propTypes

export default Title

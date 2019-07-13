import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Fuctions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

function Content (props) {
  const { className, ...restProps } = props

  return <div className={cx('collapse-panel-content', className)} {...restProps} />
}

Content.propTypes = propTypes

export default Content

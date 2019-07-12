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

function Item (props) {
  const { className, ...restProps } = props

  return <li className={cx('menu-item', className)} {...restProps} />
}

Item.propTypes = propTypes

export default Item

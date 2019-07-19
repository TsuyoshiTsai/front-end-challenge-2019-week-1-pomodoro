import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Item from './components/Item'
import Link from './components/Link'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

function Menu (props) {
  const { className, ...restProps } = props

  return <ul className={cx('menu', className)} {...restProps} />
}

Menu.propTypes = propTypes

Menu.Item = Item
Menu.Link = Link

export default Menu

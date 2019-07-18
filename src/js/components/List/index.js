import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Item from './components/Item'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isScrollable: PropTypes.bool,
  withPadding: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
}
export const defaultProps = {
  withPadding: false,
}

function List (props) {
  const { isScrollable, withPadding, style, className, ...restProps } = props

  return (
    <div className={cx('list', className)} style={{ padding: withPadding ? null : 0, overflow: isScrollable && 'auto', ...style }} {...restProps} />
  )
}

List.propTypes = propTypes
List.defaultProps = defaultProps

List.Item = Item

export default List

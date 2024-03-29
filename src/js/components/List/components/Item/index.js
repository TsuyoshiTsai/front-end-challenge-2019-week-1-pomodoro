import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Meta from './components/Meta'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isSelectable: PropTypes.bool,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {}

function Item (props) {
  const { isSelectable, prefix, suffix, className, children, ...restProps } = props

  return (
    <div className={cx('list-item', className)} data-is-selectable={isSelectable} {...restProps}>
      {prefix}
      {children}
      {suffix}
    </div>
  )
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps

Item.Meta = Meta

export default Item

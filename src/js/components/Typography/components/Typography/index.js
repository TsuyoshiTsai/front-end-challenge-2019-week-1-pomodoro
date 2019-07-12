import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  color: PropTypes.oneOf(['inherit', 'white', 'gray-light']),
  isBlock: PropTypes.bool,
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  fontWeight: PropTypes.number,
  element: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  color: 'inherit',
  isBlock: false,
  element: 'div',
}

function Typography (props) {
  const { color, isBlock, align, fontWeight, element, style, className, ...restProps } = props

  return React.createElement(element, {
    'data-color': color,
    'data-is-block': isBlock,
    style: { fontWeight, justifyContent: align, ...style },
    className: cx('typography', className),
    ...restProps,
  })
}

Typography.propTypes = propTypes
Typography.defaultProps = defaultProps

export default Typography

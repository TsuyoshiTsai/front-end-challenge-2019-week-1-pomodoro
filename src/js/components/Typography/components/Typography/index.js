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
  element: PropTypes.string,
  isBlock: PropTypes.bool,
  color: PropTypes.oneOf(['inherit', 'white', 'gray-light']),
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontWeight: PropTypes.number,
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  element: 'div',
  isBlock: false,
  color: 'inherit',
}

function Typography (props) {
  const { element, isBlock, color, align, marginTop, marginBottom, fontWeight, lineHeight, letterSpacing, style, className, ...restProps } = props

  return React.createElement(element, {
    'data-color': color,
    'data-is-block': isBlock,
    style: { marginTop, marginBottom, fontWeight, lineHeight, letterSpacing, justifyContent: align, ...style },
    className: cx('typography', className),
    ...restProps,
  })
}

Typography.propTypes = propTypes
Typography.defaultProps = defaultProps

export default Typography

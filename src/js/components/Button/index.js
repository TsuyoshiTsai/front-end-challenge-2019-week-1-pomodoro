import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Content from './components/Content'

// Lib MISC
import { ButtonContext } from './context'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'gray']),
  isFilled: PropTypes.bool.isRequired,
  isBlock: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['sm', 'md']),
  shape: PropTypes.oneOf(['radius', 'rounded', 'circle']),
  href: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  contentProps: PropTypes.object,
  htmlType: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  forwardRef: PropTypes.any,
}

export const defaultProps = {
  type: 'default',
  isFilled: true,
  isBlock: false,
  size: 'md',
  shape: 'radius',
  htmlType: 'button',
}

function Button (props) {
  const {
    type,
    isFilled,
    isBlock,
    size,
    shape,
    href,
    width,
    height,
    prefix,
    suffix,
    contentProps = {},
    htmlType,
    style,
    className,
    children,
    forwardRef,
    ...restProps
  } = props
  const context = useContext(ButtonContext)
  const hasContext = typeof context !== 'undefined'

  const elementType = typeof href === 'string' ? 'a' : 'button'

  return React.createElement(elementType, {
    className: cx(className, 'button'),
    role: 'button',
    'data-type': type,
    'data-is-filled': isFilled,
    'data-is-block': isBlock,
    'data-size': hasContext && context.size ? context.size : size,
    'data-shape': hasContext && context.shape ? context.shape : shape,
    type: htmlType,
    style: { ...style, width, height },
    ref: forwardRef,
    children: (
      <>
        {prefix}
        <Content {...contentProps}>{children}</Content>
        {suffix}
      </>
    ),
    ...restProps,
  })
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

const ButtonWithRef = React.forwardRef((props, ref) => <Button forwardRef={ref} {...props} />)

export default ButtonWithRef

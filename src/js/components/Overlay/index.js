import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Transition } from 'react-spring/renderprops'
import classnames from 'classnames/bind'

// Styles
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isShowed: PropTypes.bool.isRequired,
  shouldCreatePortal: PropTypes.bool.isRequired,
  appendTarget: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.instanceOf(Element)]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

export const defaultProps = {
  isShowed: false,
  shouldCreatePortal: true,
  appendTarget: document.body,
}

function Overlay (props) {
  const { isShowed, shouldCreatePortal, appendTarget, className, style, ...restProps } = props

  const renderOverlay = props => <div style={{ ...style, ...props }} className={cx('overlay', className)} {...restProps} />

  return (
    <Transition items={isShowed} from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
      {isShowed => isShowed && (props => (shouldCreatePortal ? ReactDOM.createPortal(renderOverlay(props), appendTarget) : renderOverlay(props)))}
    </Transition>
  )
}

Overlay.propTypes = propTypes
Overlay.defaultProps = defaultProps

export default Overlay

import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Transition, animated } from 'react-spring/renderprops'
import classnames from 'classnames/bind'

// Componennts
import Overlay, { propTypes as OverlayPropTypes } from '../Overlay'
import Body from './components/Body'
import Content, { propTypes as ContentPropTypes } from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  contentProps: PropTypes.object,
  isOpened: PropTypes.bool.isRequired,
  isClosable: PropTypes.bool.isRequired,
  isBackale: PropTypes.bool,
  isLoading: PropTypes.bool,
  shouldShowOverlayOnLoading: PropTypes.bool,
  shouldCloseOnOverlayClick: PropTypes.bool,
  beforeOpen: PropTypes.func,
  afterClose: PropTypes.func,
  onClose: PropTypes.func,
  onBack: PropTypes.func,
  appendTarget: OverlayPropTypes.appendTarget,
  size: ContentPropTypes.size,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
  forwardRef: PropTypes.any,
}

export const defaultProps = {
  isOpened: false,
  isClosable: true,
  isBackale: false,
  isLoading: false,
  shouldShowOverlayOnLoading: true,
  shouldCloseOnOverlayClick: false,
  onClose: () => null,
  onBack: () => null,
  appendTarget: document.body,
  size: 'md',
}

function Modal (props) {
  const {
    contentProps = {},
    isOpened,
    isClosable,
    isBackale,
    isLoading,
    shouldShowOverlayOnLoading,
    shouldCloseOnOverlayClick,
    beforeOpen,
    afterClose,
    onClose,
    onBack,
    appendTarget,
    size,
    width,
    style,
    className,
    children,
    forwardRef,
  } = props

  const onStart = (item, state) => !item && state === 'leave' && typeof beforeOpen === 'function' && beforeOpen()
  const onRest = (item, state) => !item && state === 'update' && typeof afterClose === 'function' && afterClose()

  const ref = useRef(forwardRef || null)

  return (
    <Transition
      onStart={onStart}
      onRest={onRest}
      items={isOpened}
      from={{ opacity: 0, top: 40 }}
      enter={{ opacity: 1, top: 0 }}
      leave={{ opacity: 0, top: 40 }}
      config={{ tension: 500, friction: 36 }}
    >
      {isOpened =>
        isOpened &&
        (({ opacity, top }) =>
          ReactDOM.createPortal(
            <animated.div ref={ref} className={cx('modal', className)} style={{ ...style, opacity }}>
              <Content
                {...contentProps}
                style={{ ...contentProps.style, top, width }}
                data-size={size}
                shouldShowCloseButton={!isLoading && isClosable}
                shouldShowBackButton={!isLoading && isBackale}
                shouldShowLoadingIcon={isLoading}
                shouldShowLoadingOverlay={shouldShowOverlayOnLoading && isLoading}
                onClose={onClose}
                onBack={onBack}
              >
                {children}
              </Content>
              <Overlay isShowed={isOpened} shouldCreatePortal={false} onClick={!isLoading && shouldCloseOnOverlayClick ? onClose : null} />
            </animated.div>,
            appendTarget
          ))
      }
    </Transition>
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

const ModalWithRef = React.forwardRef((props, ref) => <Modal {...props} forwardRef={ref} />)

function withModal (Component, config = {}) {
  function WithModalComponent ({ isOpened: propIsOpened, onClose: propOnClose, ...props }) {
    const [isOpened, setIsOpened] = useState(propIsOpened)

    useEffect(() => {
      setIsOpened(propIsOpened)
    }, [propIsOpened])

    const onClose = (...params) => {
      setIsOpened(false)

      if (typeof propOnClose === 'function') {
        propOnClose(...params)
      }
    }
    const delegationProps = { isOpened, onClose, ...config, ...props }

    return (
      <ModalWithRef {...delegationProps}>
        <Component {...delegationProps} />
      </ModalWithRef>
    )
  }

  WithModalComponent.propTypes = {
    isOpened: PropTypes.bool,
    onClose: PropTypes.func,
  }

  return WithModalComponent
}

ModalWithRef.Header = Header
ModalWithRef.Body = Body
ModalWithRef.Footer = Footer

export { withModal }
export default ModalWithRef

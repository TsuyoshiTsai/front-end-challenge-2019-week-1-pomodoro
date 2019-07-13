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
  description: PropTypes.node,
  children: PropTypes.any,
}

export const defaultProps = {
  description: '暫無資料',
}

function Empty (props) {
  const { description, children } = props

  return (
    <div className={cx('empty')}>
      <p className={cx('empty__description')}>{description}</p>
      {children}
    </div>
  )
}

function withEmpty (Component) {
  function WrappedComponent ({ source, emptyComponent: EmptyComponent = Empty, emptyProps = {}, ...props }) {
    return source === null || source.length === 0 ? <EmptyComponent {...emptyProps} /> : <Component {...props} />
  }

  WrappedComponent.propTypes = {
    source: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array, PropTypes.string]),
    emptyComponent: PropTypes.elementType,
    emptyProps: PropTypes.object,
  }

  return WrappedComponent
}

Empty.propTypes = propTypes
Empty.defaultProps = defaultProps

export { withEmpty }
export default Empty

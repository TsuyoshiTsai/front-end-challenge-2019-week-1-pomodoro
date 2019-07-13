import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Spring, animated, config } from 'react-spring/renderprops'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

export const defaultProps = {
  checked: false,
  disabled: false,
}

function Icon (props) {
  const { checked, disabled, className, ...restProps } = props

  return (
    <span className={cx('radio-icon', className)} data-is-checked={checked} data-is-disabled={disabled} role='radio-icon' {...restProps}>
      <Spring native to={{ transform: checked ? 'scale(1)' : 'scale(0)' }} config={config.stiff}>
        {props => <animated.span className={cx('radio-icon__circle')} style={props} />}
      </Spring>
      <Spring native to={{ opacity: checked ? 0 : 1, transform: checked ? 'scale(1.75)' : 'scale(0)' }}>
        {props => <animated.span className={cx('radio-icon__effect')} style={props} />}
      </Spring>
    </span>
  )
}

Icon.propTypes = propTypes
Icon.defaultProps = defaultProps

export default Icon

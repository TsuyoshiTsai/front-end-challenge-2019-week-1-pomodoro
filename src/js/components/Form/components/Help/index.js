import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-spring/renderprops'
import classnames from 'classnames/bind'

// Lib MISC
import usePrevious from '../../../../lib/effects/usePrevious'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)
export const VALIDATE_STATUS = { ERROR: 'error' }

export const propTypes = {
  isShowed: PropTypes.bool,
  validateStatus: PropTypes.oneOf(Object.values(VALIDATE_STATUS)),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

function Help (props) {
  const { isShowed, validateStatus, style, className, children, ...restProps } = props

  const prevChildren = usePrevious(children)

  return (
    <Transition items={isShowed} from={{ opacity: 0, bottom: -14 }} enter={{ opacity: 1, bottom: -18 }} leave={{ opacity: 0, bottom: -14 }}>
      {items =>
        items &&
        (props => (
          <div className={cx('form-help', className)} style={{ ...style, ...props }} data-status={validateStatus} {...restProps}>
            {children || prevChildren}
          </div>
        ))
      }
    </Transition>
  )
}

Help.propTypes = propTypes

export default Help

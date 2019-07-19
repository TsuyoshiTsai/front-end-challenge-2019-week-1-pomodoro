import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Icon, { propTypes as IconPropTypes } from '../../../Icon'
import Typography from '../Typography'

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  prefix: PropTypes.any,
  prefixAlign: PropTypes.oneOf(['auto', 'flex-start', 'center', 'flex-end', 'baseline', 'stretch']),
  prefixMarginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  prefixWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.shape(IconPropTypes),
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {
  prefixAlign: 'center',
  prefixMarginRight: 16,
}

function Text (props) {
  const { prefix, prefixAlign, prefixMarginRight, prefixWidth, icon, className, children, ...restProps } = props

  const hasPrefix = typeof prefix !== 'undefined'
  const hasIcon = typeof icon === 'object'

  return (
    <Typography element='span' className={cx('typography-text', className)} {...restProps}>
      {(hasPrefix || hasIcon) && (
        <span className={cx('typography-text__prefix')} style={{ alignSelf: prefixAlign, marginRight: prefixMarginRight, width: prefixWidth }}>
          {hasPrefix && prefix}
          {hasIcon && <Icon {...icon} />}
        </span>
      )}
      {hasIcon ? <span className={cx('typography-text__content')}>{children}</span> : children}
    </Typography>
  )
}

Text.propTypes = propTypes
Text.defaultProps = defaultProps

export default Text

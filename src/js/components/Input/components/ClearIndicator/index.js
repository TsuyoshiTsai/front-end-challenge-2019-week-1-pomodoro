import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Icon from '../../../Icon'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

export const defaultProps = {}

function ClearIndicator (props) {
  const { className, ...restProps } = props

  return (
    <button type='button' className={cx('input-clear-indicator', className)} aria-hidden {...restProps}>
      <Icon name='cross' mode='01' />
    </button>
  )
}

ClearIndicator.propTypes = propTypes
ClearIndicator.defaultProps = defaultProps

export default ClearIndicator

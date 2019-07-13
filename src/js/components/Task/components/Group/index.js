import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

import Collapse from '../../../Collapse'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

function Group (props) {
  const { className, ...restProps } = props

  return <Collapse className={cx('task-group', className)} {...restProps} />
}

Group.propTypes = propTypes

export default Group

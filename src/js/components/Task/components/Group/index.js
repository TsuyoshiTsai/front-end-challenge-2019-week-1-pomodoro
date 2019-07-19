import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Collapse from '../../../Collapse'
import List from '../../../List'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

function Group (props) {
  const { className, children, ...restProps } = props

  return (
    <List isScrollable>
      <Collapse className={cx('task-group', className)} isAccordion {...restProps}>
        {children}
      </Collapse>
    </List>
  )
}

Group.propTypes = propTypes

export default Group

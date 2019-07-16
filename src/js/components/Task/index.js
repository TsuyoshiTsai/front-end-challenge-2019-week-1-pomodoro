import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Component
import Collapse from '../Collapse'
import Typography from '../Typography'
import Group from './components/Group'
import ClockGroup from './components/ClockGroup'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    isArchived: PropTypes.bool,
    isComplete: PropTypes.bool,
    estimateSeconds: PropTypes.number,
    workSeconds: PropTypes.number,
    breakSeconds: PropTypes.number,
    createdDateTime: PropTypes.string,
    updatedDateTime: PropTypes.string,
  }),
}

function Task (props) {
  const { task, ...restProps } = props

  return (
    <Collapse.Panel
      className={cx('task')}
      header={
        <div className={cx('task__title-wrapper')}>
          <Typography.Text className={cx('task__title')}>{task.title}</Typography.Text>
          <ClockGroup estimateSeconds={task.estimateSeconds} workSeconds={task.workSeconds} />
        </div>
      }
      {...restProps}
    />
  )
}

Task.propTypes = propTypes

Task.Group = Group
Task.ClockGroup = ClockGroup

export default Task

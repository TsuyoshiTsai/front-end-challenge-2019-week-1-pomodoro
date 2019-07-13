import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Component
import Collapse from '../Collapse'
import Typography from '../Typography'
import Group from './components/Group'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    estimate: PropTypes.string,
    isArchived: PropTypes.bool,
    isComplete: PropTypes.bool,
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
          <div className={cx('task__estimate')}>{task.estimate}</div>
        </div>
      }
      {...restProps}
    />
  )
}

Task.propTypes = propTypes

Task.Group = Group

export default Task

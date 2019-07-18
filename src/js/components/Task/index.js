import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Component
import Collapse from '../Collapse'
import Typography from '../Typography'
import Group from './components/Group'
import ClockGroup from './components/ClockGroup'

// Assets
import TomatoSVG from '../../../assets/images/icons/Tomato.svg'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isCurrent: PropTypes.bool,
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    isArchived: PropTypes.bool,
    isComplete: PropTypes.bool,
    isBreaking: PropTypes.bool,
    estimateSeconds: PropTypes.number,
    workSeconds: PropTypes.number,
    breakSeconds: PropTypes.number,
    workHistory: PropTypes.arrayOf(PropTypes.string),
    createdDateTime: PropTypes.number,
    updatedDateTime: PropTypes.number,
  }),
}

function Task (props) {
  const { isCurrent, task, ...restProps } = props

  return (
    <Collapse.Panel
      className={cx('task')}
      header={
        <div className={cx('task__title-wrapper')}>
          {isCurrent && <img className={cx('task__prefix-image')} src={TomatoSVG} alt='tomato' />}
          <Typography.Text className={cx('task__title')} isBlock>
            {task.title}
          </Typography.Text>
          <ClockGroup estimateSeconds={task.estimateSeconds} workSeconds={task.workSeconds} workFinishCount={task.workHistory.length} />
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

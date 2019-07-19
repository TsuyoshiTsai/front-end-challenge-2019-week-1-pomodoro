import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Component
import Collapse from '../Collapse'
import Icon from '../Icon'
import List from '../List'
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
    workHistory: PropTypes.arrayOf(PropTypes.number),
    createdDateTime: PropTypes.number,
    updatedDateTime: PropTypes.number,
  }),
}

function Task (props) {
  const { isCurrent, task, ...restProps } = props

  return (
    <List.Item
      className={cx('task')}
      prefix={
        isCurrent ? (
          <img className={cx('task__prefix', 'task__prefix--current')} src={TomatoSVG} alt='tomato' />
        ) : (
          task.isComplete && <Icon className={cx('task__prefix', 'task__prefix--complete')} name='check' mode='01' />
        )
      }
    >
      <Collapse.Panel
        width='100%'
        style={{ minHeight: 50 }}
        header={
          <List.Item.Meta
            title={task.title}
            description={
              <ClockGroup estimateSeconds={task.estimateSeconds} workSeconds={task.workSeconds} workFinishCount={task.workHistory.length} />
            }
          />
        }
        {...restProps}
      />
    </List.Item>
  )
}

Task.propTypes = propTypes

Task.Group = Group
Task.ClockGroup = ClockGroup

export default Task

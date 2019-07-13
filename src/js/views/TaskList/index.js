import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

// Components
// import Collapse from '../../components/Collapse'
import TaskModifier from '../../components/TaskModifier'
import Task from '../../components/Task'
import Typography from '../../components/Typography'
import Radio from '../../components/Radio'

// Style
import styles from './style.module.scss'

// Modules
import { selectors, operations } from '../../lib/redux/modules/task'
import { filterByArchived, filterByComplete } from '../../lib/redux/modules/task/utils'

// Variables / Functions
const cx = classnames.bind(styles)
const STATUS = { UNCOMPLETE: 'UNCOMPLETE', COMPLETE: 'COMPLETE', ARCHIVED: 'ARCHIVED' }
const tabs = [{ label: 'TO DO', value: STATUS.UNCOMPLETE }, { label: 'DONE', value: STATUS.COMPLETE }, { label: 'ARCHIVE', value: STATUS.ARCHIVED }]

export const propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      estimate: PropTypes.string.isRequired,
      createdDateTime: PropTypes.string.isRequired,
    })
  ),
  editTask: PropTypes.func,
}

function TaskList (props) {
  const { tasks, editTask } = props

  const [taskList, setTaskList] = useState(tasks)

  const onRadioChange = (event, value) => {
    switch (value) {
      case STATUS.UNCOMPLETE:
        setTaskList(filterByComplete(filterByArchived(tasks, false), false))
        break

      case STATUS.COMPLETE:
        setTaskList(filterByComplete(filterByArchived(tasks, false), true))
        break

      case STATUS.ARCHIVED:
        setTaskList(filterByArchived(tasks, true))
        break
    }
  }

  const onSubmit = (values, actions, task) => {
    actions.resetForm(values)

    const updatedDateTime = new Date().toString()

    const item = {
      title: values.title.trim(),
      estimate: values.estimate,
      updatedDateTime,
    }

    editTask({ keyName: 'id', key: task.id, item })
  }

  return (
    <>
      <Typography.Title level='h1' color='white' marginBottom={0} letterSpacing='.1em'>
        TASK LISTS
      </Typography.Title>

      <Typography.Hr marginTop={25} marginBottom={25} />

      <Radio.Group mode='tab' defaultValue={tabs[0].value} onChange={onRadioChange}>
        {tabs.map((tab, index) => (
          <Radio key={index} value={tab.value}>
            {tab.label}
          </Radio>
        ))}
      </Radio.Group>

      <div>
        <Task.Group>
          {taskList.map((task, index) => (
            <Task key={index} identify={task.id} task={task}>
              <TaskModifier
                mode='edit'
                initialValues={{ title: task.title, estimate: task.estimate }}
                onSubmit={(values, actions) => onSubmit(values, actions, task)}
                className={cx('task-list__task-modifier')}
              />
            </Task>
          ))}
        </Task.Group>
      </div>
    </>
  )
}

TaskList.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    tasks: selectors.getListBySorting(state, { sortBy: 'desc' }),
  }
}

const mapDispatchToProps = {
  editTask: operations.updateItemInList,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

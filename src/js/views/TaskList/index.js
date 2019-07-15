import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

// Components
import { withEmpty } from '../../components/Empty'
import TaskModifier from '../../components/TaskModifier'
import Task, { propTypes as TaskPropTypes } from '../../components/Task'
import Typography from '../../components/Typography'
import Radio from '../../components/Radio'
import ArchiveModal from './components/ArchiveModal'
import Empty from './components/Empty'

// Style
import styles from './style.module.scss'

// Modules
import { selectors, operations } from '../../lib/redux/modules/task'
import { filterByArchived, filterByComplete } from '../../lib/redux/modules/task/utils'

// Variables / Functions
const cx = classnames.bind(styles)
const TaskGroupWithEmpty = withEmpty(Task.Group)
const STATUS = { UNCOMPLETE: 'UNCOMPLETE', COMPLETE: 'COMPLETE', ARCHIVED: 'ARCHIVED' }
const tabs = [{ label: 'TO DO', value: STATUS.UNCOMPLETE }, { label: 'DONE', value: STATUS.COMPLETE }, { label: 'ARCHIVE', value: STATUS.ARCHIVED }]
const filterByStatus = (tasks, status) => {
  switch (status) {
    case STATUS.UNCOMPLETE:
      return filterByComplete(filterByArchived(tasks, false), false)

    case STATUS.COMPLETE:
      return filterByComplete(filterByArchived(tasks, false), true)

    case STATUS.ARCHIVED:
      return filterByArchived(tasks, true)
  }
}

export const propTypes = {
  tasks: PropTypes.arrayOf(TaskPropTypes.task),
  isCounting: PropTypes.bool,
  editTask: PropTypes.func,
  setCurrentId: PropTypes.func,
}

function TaskList (props) {
  const { tasks, isCounting, editTask, setCurrentId } = props

  const [filterStatus, setFilterStatus] = useState(tabs[0].value)
  const [currentTask, setCurrentTask] = useState(null)
  const [isModalOpened, setIsModalOpened] = useState(false)

  const onModalClose = event => {
    setIsModalOpened(false)
    setCurrentTask(null)
  }

  const onRadioChange = (event, value) => setFilterStatus(value)

  const onSubmit = (values, actions, task) => {
    actions.resetForm(values)

    const updatedDateTime = new Date().toString()

    const item = {
      title: values.title.trim(),
      estimateClocks: values.estimateClocks,
      updatedDateTime,
    }

    editTask({ keyName: 'id', key: task.id, item })
  }

  const onArchive = (event, task) => {
    setIsModalOpened(true)
    setCurrentTask(task)
  }

  const filteredTasks = filterByStatus(tasks, filterStatus)

  return (
    <div className={cx('task-list')}>
      <ArchiveModal isOpened={isModalOpened} onClose={onModalClose} task={currentTask} />

      <Typography.Title level='h1' color='white' marginBottom={0} letterSpacing='.1em'>
        TASK LISTS
      </Typography.Title>

      <Typography.Hr marginTop={25} marginBottom={25} />

      <Radio.Group mode='tab' value={filterStatus} onChange={onRadioChange}>
        {tabs.map((tab, index) => (
          <Radio key={index} value={tab.value}>
            {tab.label}
          </Radio>
        ))}
      </Radio.Group>

      <TaskGroupWithEmpty source={filteredTasks} emptyComponent={Empty}>
        {filteredTasks.map((task, index) => (
          <Task
            key={index}
            identify={task.id}
            task={task}
            isCollapsible={filterStatus === STATUS.UNCOMPLETE}
            onClick={!isCounting && filterStatus === STATUS.UNCOMPLETE ? event => setCurrentId(task.id) : null}
          >
            <TaskModifier
              mode='edit'
              initialValues={{ title: task.title, estimateClocks: task.estimateClocks }}
              onSubmit={(values, actions) => onSubmit(values, actions, task)}
              onArchive={event => onArchive(event, task)}
              className={cx('task-list__task-modifier')}
            />
          </Task>
        ))}
      </TaskGroupWithEmpty>
    </div>
  )
}

TaskList.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    tasks: selectors.getListBySorting(state, { sortBy: 'desc' }),
    isCounting: selectors.getIsCounting(state, props),
  }
}

const mapDispatchToProps = {
  editTask: operations.updateItemInList,
  setCurrentId: operations.setCurrentId,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

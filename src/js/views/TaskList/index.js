import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

// Components
import Button from '../../components/Button'
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
import { sortByCreatedDateTime, filterByArchived, filterByComplete, getClocksOfWork, getSecondsOfWork } from '../../lib/redux/modules/task/utils'

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
  match: PropTypes.object,
  history: PropTypes.object,
  tasks: PropTypes.arrayOf(TaskPropTypes.task),
  currentTaskId: PropTypes.string,
  isCounting: PropTypes.bool,
  editTask: PropTypes.func,
  uncompleteTask: PropTypes.func,
  unarchiveTask: PropTypes.func,
  setCurrentId: PropTypes.func,
}

function TaskList (props) {
  const { match, history, tasks, currentTaskId, isCounting, editTask, uncompleteTask, unarchiveTask, setCurrentId } = props

  const [filterStatus, setFilterStatus] = useState(tabs[0].value)

  const onRadioChange = (event, value) => setFilterStatus(value)

  const onSubmit = (values, actions, task) => {
    actions.resetForm(values)

    const item = {
      title: values.title.trim(),
      estimateSeconds: getSecondsOfWork(values.estimateClocks),
      updatedDateTime: new Date().getTime(),
    }

    editTask({ keyName: 'id', key: task.id, item })
  }

  const filteredTasks = sortByCreatedDateTime(filterByStatus(tasks, filterStatus), 'desc')

  const renderCollapseContent = task => {
    switch (filterStatus) {
      case STATUS.UNCOMPLETE:
        return (
          <TaskModifier
            mode='edit'
            initialValues={{ id: task.id, title: task.title, estimateClocks: getClocksOfWork(task.estimateSeconds) }}
            onSubmit={(values, actions) => onSubmit(values, actions, task)}
            onArchive={event => history.push(`${match.url}/${task.id}`)}
          />
        )

      case STATUS.COMPLETE:
        return (
          <div style={{ display: 'flex' }}>
            <Button type='gray' size='sm' shape='rounded' onClick={event => history.push(`${match.url}/${task.id}`)} width={100}>
              ARCHIVE
            </Button>
            <Button
              type='primary'
              size='sm'
              shape='rounded'
              onClick={event => uncompleteTask({ id: task.id })}
              style={{ flexGrow: 1, marginLeft: 20 }}
            >
              REDO
            </Button>
          </div>
        )

      case STATUS.ARCHIVED:
        return (
          <Button type='gray' size='sm' shape='rounded' onClick={event => unarchiveTask({ id: task.id })} isBlock>
            UNARCHIVE
          </Button>
        )
    }
  }

  return (
    <>
      <Route strict sensetive exact path={`${match.url}/:id`}>
        {({ staticContext, ...routeProps }) => (
          <ArchiveModal isOpened={routeProps.match !== null} afterClose={() => history.push(match.path)} {...routeProps} />
        )}
      </Route>

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
            isCurrent={currentTaskId === task.id}
            onClick={!isCounting && filterStatus === STATUS.UNCOMPLETE ? event => setCurrentId(task.id) : null}
          >
            <div className={cx('task-list__action-list')}>{renderCollapseContent(task)}</div>
          </Task>
        ))}
      </TaskGroupWithEmpty>
    </>
  )
}

TaskList.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    tasks: selectors.getList(state, props),
    currentTaskId: selectors.getCurrentId(state, props),
    isCounting: selectors.getIsCounting(state, props),
  }
}

const mapDispatchToProps = {
  editTask: operations.updateItemInList,
  uncompleteTask: operations.uncompleteTask,
  unarchiveTask: operations.unarchiveTask,
  setCurrentId: operations.setCurrentId,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

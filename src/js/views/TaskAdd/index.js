import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

// Components
import { withEmpty } from '../../components/Empty'
import Task, { propTypes as TaskPropTypes } from '../../components/Task'
import TaskModifier from '../../components/TaskModifier'
import Typography from '../../components/Typography'

// Modules
import { selectors, operations } from '../../lib/redux/modules/task'
import { getSecondsOfWork } from '../../lib/redux/modules/task/utils'

// Variables / Functions
const TaskGroupWithEmpty = withEmpty(Task.Group)
const COUNT = 5

export const propTypes = {
  tasks: PropTypes.arrayOf(TaskPropTypes.task),
  addTaskItem: PropTypes.func,
}

function TaskAdd (props) {
  const { tasks, addTaskItem } = props

  const initialValues = { title: '', estimateClocks: 1 }

  const onSubmit = ({ title, estimateClocks }, actions) => {
    actions.resetForm(initialValues)

    const id = uuidv4()
    const createdDateTime = new Date().toString()

    const item = {
      id,
      title: title.trim(),
      isArchived: false,
      isComplete: false,
      estimateSeconds: getSecondsOfWork(estimateClocks),
      workSeconds: 0,
      breakSeconds: 0,
      createdDateTime,
      updatedDateTime: createdDateTime,
    }

    addTaskItem({ item })
  }

  return (
    <>
      <Typography.Title level='h1' color='white' marginBottom={0} letterSpacing='.1em'>
        ADD NEW TASK
      </Typography.Title>

      <Typography.Hr marginTop={25} marginBottom={25} />

      <TaskModifier mode='add' initialValues={initialValues} onSubmit={onSubmit} />

      <Typography.Hr marginTop={30} marginBottom={20} />

      <Typography.Title level='h5' color='gray-light' fontWeight={700} marginBottom={10}>
        RECENTTLY ADDED {COUNT} TASKS
      </Typography.Title>

      <TaskGroupWithEmpty source={tasks} emptyProps={{ description: 'No Tasks' }}>
        {tasks.map((task, index) => (
          <Task key={index} task={task} isCollapsible={false}>
            {task.title} {task.createdDateTime}
          </Task>
        ))}
      </TaskGroupWithEmpty>
    </>
  )
}

TaskAdd.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    tasks: selectors.getListBySorting(state, { sortBy: 'desc' }).slice(0, COUNT),
  }
}

const mapDispatchToProps = {
  addTaskItem: operations.addItemToList,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskAdd)

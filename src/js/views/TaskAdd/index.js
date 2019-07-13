import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
// import classnames from 'classnames/bind'

// Components
import TaskModifier from '../../components/TaskModifier'
import Typography from '../../components/Typography'

// Modules
import { selectors, operations } from '../../lib/redux/modules/task'

// Style
// import styles from './style.module.scss'

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      estimate: PropTypes.string.isRequired,
      createdDateTime: PropTypes.string.isRequired,
    })
  ),
  addTaskItem: PropTypes.func,
}

function TaskAdd (props) {
  const { tasks, addTaskItem } = props

  const initialValues = { title: '', estimate: '' }

  const onSubmit = ({ title, estimate }, actions) => {
    actions.resetForm(initialValues)

    const id = uuidv4()
    const createdDateTime = new Date().toString()

    const item = {
      id,
      title: title.trim(),
      estimate,
      isArchived: false,
      isComplete: false,
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

      <Typography.Title level='h2' color='white'>
        RECENTTLY ADDED TASKS
      </Typography.Title>

      {tasks.map((task, index) => (
        <div key={index}>
          {task.title} {task.createdDateTime}
        </div>
      ))}
    </>
  )
}

TaskAdd.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    tasks: selectors.getListBySorting(state, { sortBy: 'desc' }),
  }
}

const mapDispatchToProps = {
  addTaskItem: operations.addItemToList,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskAdd)

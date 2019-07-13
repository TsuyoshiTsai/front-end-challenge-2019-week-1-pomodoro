import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

// Components
// import Collapse from '../../components/Collapse'
import TaskModifier from '../../components/TaskModifier'
import Task from '../../components/Task'
import Typography from '../../components/Typography'

// Style
import styles from './style.module.scss'

// Modules
import { selectors } from '../../lib/redux/modules/task'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      estimate: PropTypes.string.isRequired,
      createdDateTime: PropTypes.string.isRequired,
    })
  ),
}

function TaskList (props) {
  const { tasks } = props

  const onSubmit = (values, actions) => {
    console.log('values :', values)
  }

  return (
    <>
      <Typography.Title level='h1' color='white' marginBottom={0} letterSpacing='.1em'>
        TASK LISTS
      </Typography.Title>

      <Typography.Hr marginTop={25} marginBottom={25} />

      <div>
        <Task.Group>
          {tasks.map((task, index) => (
            <Task key={index} identify={task.id} task={task}>
              <TaskModifier mode='edit' initialValues={{ title: task.title, estimate: task.estimate }} onSubmit={onSubmit} className={cx('task-list__task-modifier')} />
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

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

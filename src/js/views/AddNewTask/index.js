import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import uuidv4 from 'uuid/v4'
// import classnames from 'classnames/bind'

// Components
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
      estimate: PropTypes.number.isRequired,
      createdDateTime: PropTypes.string.isRequired,
    })
  ),
  addTaskItem: PropTypes.func,
}

function AddNewTask (props) {
  const { tasks, addTaskItem } = props

  const initialValues = { title: '', estimate: 0 }

  const onSubmit = (values, actions) => {
    actions.resetForm(initialValues)

    const id = uuidv4()
    const createdDateTime = new Date().toString()
    const item = { id, createdDateTime, ...values }

    addTaskItem({ item })
  }

  return (
    <>
      <Typography.Title level='h1' color='white' marginBottom={0}>
        ADD NEW TASK
      </Typography.Title>
      <Typography.Hr marginTop={25} marginBottom={25} />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => {
          return (
            <Form>
              <Typography.Title level='h3' color='gray-light'>
                TASK TITLE
              </Typography.Title>

              <Field name='title' />

              <Typography.Title level='h3' color='gray-light' marginTop={25}>
                ESTIMATED TOMOTO
              </Typography.Title>

              <Field name='estimate' />

              <button type='submit'>ADD TASK</button>
            </Form>
          )
        }}
      </Formik>
      <Typography.Hr marginTop={25} marginBottom={25} />
      <Typography.Title level='h3' color='gray-light' marginTop={25}>
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

AddNewTask.propTypes = propTypes

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
)(AddNewTask)

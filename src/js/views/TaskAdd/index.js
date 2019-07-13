import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import uuidv4 from 'uuid/v4'
// import classnames from 'classnames/bind'

// Components
import Button from '../../components/Button'
import Form from '../../components/Form'
import Typography from '../../components/Typography'

// Lib MISC
import validationSchema from './validationSchema'

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

function TaskAdd (props) {
  const { tasks, addTaskItem } = props

  const initialValues = { title: '', estimate: '' }

  const onSubmit = ({ title, estimate }, actions) => {
    actions.resetForm(initialValues)

    const id = uuidv4()
    const createdDateTime = new Date().toString()
    const item = { id, createdDateTime, title: title.trim(), estimate }

    addTaskItem({ item })
  }

  return (
    <>
      <Typography.Title level='h1' color='white' marginBottom={0} letterSpacing='.1em'>
        ADD NEW TASK
      </Typography.Title>

      <Typography.Hr marginTop={25} marginBottom={25} />

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <Form.InputField label='TASK TITLE' name='title' />

              <Form.InputField label='ESTIMATED TOMOTO' name='estimate' groupProps={{ marginBottom: 50 }} />

              <Button type='primary' htmlType='submit' isBlock shape='rounded' disabled={!isValid || isSubmitting}>
                ADD TASK
              </Button>
            </Form>
          )
        }}
      </Formik>

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

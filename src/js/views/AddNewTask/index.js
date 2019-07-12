import React from 'react'
import { Formik, Form, Field } from 'formik'
// import PropTypes from 'prop-types'
// import classnames from 'classnames/bind'

// Components
import Typography from '../../components/Typography'

// Style
// import styles from './style.module.scss'

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {
  // match: PropTypes.object,
}

function AddNewTask (props) {
  // const { match } = props

  const initialValues = { title: '', estimate: 0 }

  const onSubmit = (values, actions) => {
    console.log('values :', values)
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
              <button type='submit'>ADD TASK</button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

AddNewTask.propTypes = propTypes

export default AddNewTask

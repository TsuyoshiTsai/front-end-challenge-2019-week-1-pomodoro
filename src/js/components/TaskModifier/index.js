import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

// Components
import Button from '../Button'
import Form from '../Form'

// Lib MISC
import validationSchema from './validationSchema'

export const propTypes = {
  mode: PropTypes.oneOf(['add', 'edit']),
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    estimate: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  onArchive: PropTypes.func,
}

function TaskModifier (props) {
  const { mode, initialValues, onSubmit, onArchive, ...restProps } = props

  const isAdd = mode === 'add'
  const isEdit = mode === 'edit'

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isValid, isSubmitting }) => {
        return (
          <Form {...restProps}>
            <Form.InputField
              label='TASK TITLE'
              name='title'
              labelProps={{ style: { marginBottom: isEdit && 5, fontSize: isEdit && 12 } }}
              groupProps={{ style: { marginBottom: isAdd ? 25 : isEdit && 20 } }}
            />

            <Form.InputField
              label='ESTIMATED TOMOTO'
              name='estimate'
              labelProps={{ style: { marginBottom: isEdit && 5, fontSize: isEdit && 12 } }}
              groupProps={{ style: { marginBottom: isAdd ? 50 : isEdit && 20 } }}
            />

            {isAdd ? (
              <Button type='primary' htmlType='submit' isBlock shape='rounded' disabled={!isValid || isSubmitting}>
                ADD TASK
              </Button>
            ) : (
              isEdit && (
                <Form.Group isFlexbox>
                  <Button type='gray' htmlType='button' size='sm' shape='rounded' onClick={onArchive}>
                    ARCHIVE
                  </Button>

                  <Button
                    type='primary'
                    htmlType='submit'
                    size='sm'
                    shape='rounded'
                    style={{ flexGrow: 1, marginLeft: 40 }}
                    disabled={!isValid || isSubmitting}
                  >
                    SAVE
                  </Button>
                </Form.Group>
              )
            )}
          </Form>
        )
      }}
    </Formik>
  )
}

TaskModifier.propTypes = propTypes

export default TaskModifier

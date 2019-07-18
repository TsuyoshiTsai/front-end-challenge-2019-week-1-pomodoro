import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'

// Components
import Button from '../Button'
import Form, { VALIDATE_STATUS } from '../Form'
import { propTypes as TaskPropTypes } from '../Task'

// Lib MISC
import validationSchema from './validationSchema'

// Modules
import { selectors } from '../../lib/redux/modules/task'

export const propTypes = {
  mode: PropTypes.oneOf(['add', 'edit']),
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    estimateClocks: PropTypes.number,
  }),
  onSubmit: PropTypes.func,
  onArchive: PropTypes.func,
  currentTask: TaskPropTypes.task,
  isCounting: PropTypes.bool,
}

function TaskModifier (props) {
  const { mode, initialValues, onSubmit, onArchive, currentTask, isCounting, ...restProps } = props

  const isAdd = mode === 'add'
  const isEdit = mode === 'edit'

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ touched, errors, values, isValid, isSubmitting }) => {
        return (
          <Form {...restProps}>
            <Form.InputField
              label='TASK TITLE'
              name='title'
              style={{ height: isEdit && 40 }}
              labelProps={{ style: { marginBottom: isEdit && 5, fontSize: isEdit && 12 } }}
              groupProps={{ style: { marginBottom: isAdd ? 25 : isEdit && 20 } }}
            />

            <Form.Group style={{ marginBottom: isAdd ? 50 : isEdit && 20 }}>
              <Form.Label style={{ marginBottom: isEdit && 5, fontSize: isEdit && 12 }}>ESTIMATE TOMATO</Form.Label>
              <Field name='estimateClocks' style={{ height: isEdit && 40 }}>
                {({ field }) => (
                  <>
                    <input {...field} type='number' />
                    <Form.Help isShowed={touched[field.name] && errors[field.name]} validateStatus={VALIDATE_STATUS.ERROR}>
                      {errors[field.name]}
                    </Form.Help>
                  </>
                )}
              </Field>
            </Form.Group>

            {isAdd ? (
              <Button type='primary' htmlType='submit' isBlock shape='rounded' disabled={!isValid || isSubmitting}>
                ADD TASK
              </Button>
            ) : (
              isEdit && (
                <Form.Group isFlexbox>
                  <Button
                    type='gray'
                    htmlType='button'
                    size='sm'
                    shape='rounded'
                    disabled={currentTask && currentTask.id === values.id && isCounting}
                    onClick={onArchive}
                  >
                    ARCHIVE
                  </Button>

                  <Button
                    type='primary'
                    htmlType='submit'
                    size='sm'
                    shape='rounded'
                    style={{ flexGrow: 1, marginLeft: 20 }}
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

const mapStateToProps = (state, props) => {
  return {
    currentTask: selectors.getCurrentTask(state, props),
    isCounting: selectors.getIsCounting(state, props),
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModifier)

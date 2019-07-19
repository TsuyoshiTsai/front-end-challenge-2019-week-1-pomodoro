import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import classnames from 'classnames/bind'

// Components
import Button from '../Button'
import Form from '../Form'
import { propTypes as TaskPropTypes } from '../Task'

// Lib MISC
import validationSchema from './validationSchema'

// Modules
import { selectors } from '../../lib/redux/modules/task'

// Assets
import TomatoSVG from '../../../assets/images/icons/Tomato.svg'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

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

  const [hoverIndex, setHoverIndex] = useState(0)

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ setFieldValue, values, isValid, isSubmitting }) => {
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
              <div className={cx('task-modifier__rate-wrapper')} onMouseLeave={event => setHoverIndex(0)}>
                {new Array(10).fill().map((empty, index) => (
                  <span
                    key={index}
                    className={cx('task-modifier__rate')}
                    style={{ width: isAdd ? 25 : isEdit && 20 }}
                    data-is-filled={index <= hoverIndex || index < values.estimateClocks}
                    onMouseEnter={event => setHoverIndex(index)}
                    onClick={event => setFieldValue('estimateClocks', index + 1)}
                  >
                    <img src={TomatoSVG} alt='tomato' />
                  </span>
                ))}
              </div>
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
                    width={100}
                  >
                    ARCHIVE
                  </Button>

                  <Button
                    type='primary'
                    htmlType='submit'
                    size='sm'
                    shape='rounded'
                    style={{ flexGrow: 1, marginLeft: 20 }}
                    disabled={!isValid || isSubmitting || (currentTask && currentTask.id === values.id && isCounting)}
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

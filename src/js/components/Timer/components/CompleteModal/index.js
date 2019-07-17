import React from 'react'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'

// Components
import Button from '../../../../components/Button'
import Modal from '../../../../components/Modal'
import { propTypes as TaskPropTypes } from '../../../../components/Task'

// Modules
import { operations, selectors } from '../../../../lib/redux/modules/task'

export const propTypes = {
  isOpened: Proptypes.bool,
  onClose: Proptypes.func,
  task: TaskPropTypes.task,
  completeTask: Proptypes.func,
}

function CompleteModal (props) {
  const { isOpened, onClose, task, completeTask } = props

  return (
    <Modal isOpened={isOpened} onClose={onClose} isClosable={false} shouldCloseOnOverlayClick>
      <Modal.Header>Hooray!</Modal.Header>

      <Modal.Body style={{ textAlign: 'center' }}>
        You can check this task in done list.
        <br />
        Don’t forget to select next task to continue.
      </Modal.Body>

      <Modal.Footer align='space-between'>
        <Button type='gray' shape='rounded' width={150} onClick={onClose}>
          CANCEL
        </Button>

        <Button
          type='primary'
          shape='rounded'
          style={{ flexGrow: 1 }}
          onClick={event => {
            completeTask({ id: task.id })
            onClose(event)
          }}
        >
          SELECT NEXT TASK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

CompleteModal.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    task: selectors.getCurrentTask(state, props),
  }
}

const mapDispatchToProps = {
  completeTask: operations.completeTask,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteModal)

import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'

// Components
import Button from '../../../../components/Button'
import Modal, { withModal } from '../../../../components/Modal'
import { propTypes as TaskPropTypes } from '../../../../components/Task'

// Modules
import { operations, selectors } from '../../../../lib/redux/modules/task'

export const propTypes = {
  match: Proptypes.object,
  onClose: Proptypes.func,
  task: TaskPropTypes.task,
  archiveTask: Proptypes.func,
}

function ArchiveModal (props) {
  const { match, onClose, task, archiveTask } = props

  return task === null || match === null ? (
    <Redirect exact strict sensitive replace to={'/task/list'} />
  ) : (
    <>
      <Modal.Header>Archive Task</Modal.Header>

      <Modal.Body>Are you sure you want to archive this task?</Modal.Body>

      <Modal.Footer align='space-between'>
        <Button type='gray' shape='rounded' width={150} onClick={onClose}>
          CANCEL
        </Button>

        <Button
          type='primary'
          shape='rounded'
          style={{ flexGrow: 1 }}
          onClick={event => {
            archiveTask({ id: task.id })
            onClose()
          }}
        >
          ARCHIVE
        </Button>
      </Modal.Footer>
    </>
  )
}

ArchiveModal.propTypes = propTypes

const mapStateToProps = (state, props) => {
  const { match } = props

  return {
    task: match === null ? null : selectors.getItemById(state, { ...props, id: match.params.id }),
  }
}

const mapDispatchToProps = {
  archiveTask: operations.archiveTask,
}

export default withModal(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ArchiveModal),
  {
    isClosable: false,
    shouldCloseOnOverlayClick: true,
  }
)

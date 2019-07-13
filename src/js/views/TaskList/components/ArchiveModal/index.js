import React from 'react'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'

// Components
import Button from '../../../../components/Button'
import Modal from '../../../../components/Modal'
import { propTypes as TaskPropTypes } from '../../../../components/Task'

// Modules
import { operations } from '../../../../lib/redux/modules/task'

export const propTypes = {
  isOpened: Proptypes.bool,
  onClose: Proptypes.func,
  task: TaskPropTypes.task,
  archiveTask: Proptypes.func,
}

function ArchiveModal (props) {
  const { isOpened, onClose, task, archiveTask } = props

  return (
    <Modal isClosable={false} shouldCloseOnOverlayClick isOpened={isOpened} onClose={onClose}>
      <Modal.Header>Archive Task</Modal.Header>

      <Modal.Body>Are you sure you want to archive this task?</Modal.Body>

      <Modal.Footer align='space-between'>
        <Button type='gray' shape='rounded' onClick={onClose}>
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
    </Modal>
  )
}

ArchiveModal.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = {
  archiveTask: ({ id }) => operations.updateItemInList({ keyName: 'id', key: id, item: { isArchived: true } }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveModal)

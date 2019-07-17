import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

// Components
import { propTypes as TaskPropTypes } from '../../../Task'
import Empty from '../Empty'
import Timer from '../Timer'

// Modules
import { selectors } from '../../../../lib/redux/modules/task'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  task: TaskPropTypes.task,
}

function Container (props) {
  const { task } = props

  return <div className={cx('timer-container')}>{task === null ? <Empty /> : <Timer />}</div>
}

Container.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    task: selectors.getCurrentTask(state, props),
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)

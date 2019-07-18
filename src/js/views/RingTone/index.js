import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

// Components
// import { withEmpty } from '../../components/Empty'
// import Task, { propTypes as TaskPropTypes } from '../../components/Task'
import Chart from '../../components/Chart'
import Typography from '../../components/Typography'
import Radio from '../../components/Radio'
import List from '../../components/List'
// import Empty from './components/Empty'

// Style
import styles from './style.module.scss'

// Modules

// Variables / Functions
const cx = classnames.bind(styles)
// const TaskGroupWithEmpty = withEmpty(Task.Group)
const tabs = [{ label: 'WORK', value: 'work' }, { label: 'BREAK', value: 'break' }]
const rings = [{ name: 'Ring tone 1', type: 'work' }, { name: 'Ring tone 2', type: 'break' }]

export const propTypes = {
  // match: PropTypes.object,
  // history: PropTypes.object,
  // tasks: PropTypes.arrayOf(TaskPropTypes.task),
  // currentTaskId: PropTypes.string,
  // isCounting: PropTypes.bool,
  // editTask: PropTypes.func,
  // uncompleteTask: PropTypes.func,
  // unarchiveTask: PropTypes.func,
  // setCurrentId: PropTypes.func,
}

function RingTone (props) {
  // const { match, history, tasks, currentTaskId, isCounting, editTask, uncompleteTask, unarchiveTask, setCurrentId } = props
  // const { path, url } = match

  const [filterStatus, setFilterStatus] = useState(tabs[0].value)

  const onRadioChange = (event, value) => setFilterStatus(value)

  return (
    <>
      <Typography.Title level='h1' color='white' marginBottom={0} letterSpacing='.1em'>
        TASK LISTS
      </Typography.Title>

      <Typography.Hr marginTop={25} marginBottom={25} />

      <Radio.Group mode='tab' value={filterStatus} onChange={onRadioChange}>
        {tabs.map((tab, index) => (
          <Radio key={index} value={tab.value}>
            {tab.label}
          </Radio>
        ))}
      </Radio.Group>

      <List>
        {rings.map((ring, index) => (
          <List.Item key={index} prefix={<Chart type='pie' percentage={100} className={cx('ring-tone__item-prefix')} />}>
            {ring.name}
          </List.Item>
        ))}
      </List>
    </>
  )
}

RingTone.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RingTone)

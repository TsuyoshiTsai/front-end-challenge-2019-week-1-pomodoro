import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

// Components
import Button from '../Button'
import Chart from '../Chart'
import Icon from '../Icon'
import Task, { propTypes as TaskPropTypes } from '../Task'
import Typography from '../Typography'
import Empty from './components/Empty'

// Modules
import { operations, selectors } from '../../lib/redux/modules/task'
import { getPercentageOfWork, getRemainingSecondsOfWork, checkIsTimeoutOfWork, formatSeconds } from '../../lib/redux/modules/task/utils'

// Assets
import CheckSVG from '../../../assets/images/icons/Check.svg'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  task: TaskPropTypes.task,
  isCounting: PropTypes.bool,
  updateWorkSeconds: PropTypes.func,
  setIsCounting: PropTypes.func,
}

function Timer (props) {
  const { task, isCounting, updateWorkSeconds, setIsCounting } = props

  const timeoutId = useRef(null)

  useEffect(() => {
    if (isCounting && !checkIsTimeoutOfWork(task.workSeconds)) {
      timeoutId.current = setTimeout(() => {
        updateWorkSeconds({ id: task.id, workSeconds: task.workSeconds + 1 })
      }, 1000)
    } else if (isCounting && checkIsTimeoutOfWork(task.workSeconds)) {
      setIsCounting(false)
    }

    return () => {
      clearTimeout(timeoutId.current)
    }
  }, [task, isCounting, updateWorkSeconds, setIsCounting])

  const onPlay = event => {
    if (isCounting || checkIsTimeoutOfWork(task.workSeconds)) return

    setIsCounting(true)
  }

  const onPause = event => {
    if (!isCounting || checkIsTimeoutOfWork(task.workSeconds)) return

    setIsCounting(false)
  }

  return (
    <div className={cx('timer')}>
      {task === null ? (
        <Empty />
      ) : (
        <>
          <Typography.Title level='h1' fontWeight={700} align='center' marginBottom={10}>
            {task.title}
          </Typography.Title>

          <Task.ClockGroup size='md' align='center' estimateSeconds={task.estimateSeconds} workSeconds={task.workSeconds} />

          <div className={cx('timer__chart-wrapper')}>
            <Chart type='ring' percentage={getPercentageOfWork(task.workSeconds)} text={formatSeconds(getRemainingSecondsOfWork(task.workSeconds))} />
          </div>

          <div className={cx('timer__action-list')}>
            <Button shape='circle' htmlType='button' onClick={onPlay}>
              <Icon name='play' mode='01' />
            </Button>

            <Button shape='circle' htmlType='button' onClick={onPause}>
              <Icon name='pause' mode='01' />
            </Button>

            <Button shape='circle' htmlType='button'>
              <Icon name='arrow-round' mode='01' />
            </Button>
          </div>

          <div className={cx('timer__complete-button-wrapper')}>
            <button className={cx('timer__complete-button')} type='button' onClick={null}>
              <Typography.Text
                prefix={<img src={CheckSVG} alt='complete' />}
                prefixMarginRight={5}
                lineHeight={1}
                letterSpacing='.1em'
                fontWeight={700}
              >
                TASK COMPLETE
              </Typography.Text>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

Timer.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    task: selectors.getCurrentTask(state, props),
    isCounting: selectors.getIsCounting(state, props),
  }
}

const mapDispatchToProps = {
  updateWorkSeconds: ({ id, workSeconds }) => operations.updateItemInList({ keyName: 'id', key: id, item: { workSeconds } }),
  setIsCounting: operations.setIsCounting,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

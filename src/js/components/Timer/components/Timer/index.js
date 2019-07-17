import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

// Components
import Button from '../../../Button'
import Chart from '../../../Chart'
import Icon from '../../../Icon'
import Task, { propTypes as TaskPropTypes } from '../../../Task'
import Typography from '../../../Typography'

// Modules
import { operations, selectors } from '../../../../lib/redux/modules/task'
import {
  getPercentageOfWork,
  getPercentageOfBreak,
  getRemainingSecondsOfWork,
  getRemainingSecondsOfBreak,
  checkIsTimeoutOfWork,
  checkIsTimeoutOfBreak,
  formatSeconds,
} from '../../../../lib/redux/modules/task/utils'

// Assets
import CheckSVG from '../../../../../assets/images/icons/Check.svg'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  task: TaskPropTypes.task,
  isCounting: PropTypes.bool,
  setWorkSeconds: PropTypes.func,
  setBreakSeconds: PropTypes.func,
  addWorkHistory: PropTypes.func,
  setIsBreaking: PropTypes.func,
  setIsCounting: PropTypes.func,
}

function Timer (props) {
  const { task, isCounting, setWorkSeconds, setBreakSeconds, addWorkHistory, setIsBreaking, setIsCounting } = props
  const { id, title, isBreaking, estimateSeconds, workSeconds, breakSeconds } = task

  const percentage = isBreaking ? getPercentageOfBreak(breakSeconds) : getPercentageOfWork(workSeconds)
  const seconds = isBreaking ? getRemainingSecondsOfBreak(breakSeconds) : getRemainingSecondsOfWork(workSeconds)

  const timeoutId = useRef(null)

  useEffect(() => {
    if (isCounting && !isBreaking && !checkIsTimeoutOfWork(workSeconds)) {
      timeoutId.current = setTimeout(() => {
        setWorkSeconds({ id, workSeconds: workSeconds + 1 })
      }, 1000)
    } else if (isCounting && isBreaking && !checkIsTimeoutOfBreak(breakSeconds)) {
      timeoutId.current = setTimeout(() => {
        setBreakSeconds({ id, breakSeconds: breakSeconds + 1 })
      }, 1000)
    } else if (isCounting && !isBreaking && checkIsTimeoutOfWork(workSeconds)) {
      setIsCounting(false)
      setIsBreaking({ id, isBreaking: true })
      setWorkSeconds({ id, workSeconds: 0 })
      addWorkHistory({ id, finishDateTime: new Date().toString() })
    } else if (isCounting && isBreaking && checkIsTimeoutOfBreak(breakSeconds)) {
      setIsCounting(false)
      setIsBreaking({ id, isBreaking: false })
      setBreakSeconds({ id, breakSeconds: 0 })
    }

    return () => {
      clearTimeout(timeoutId.current)
    }
  }, [id, isBreaking, workSeconds, breakSeconds, isCounting, setWorkSeconds, setBreakSeconds, addWorkHistory, setIsBreaking, setIsCounting])

  const onPlay = event => {
    if (isCounting) return
    if (!isBreaking && checkIsTimeoutOfWork(workSeconds)) return
    if (isBreaking && checkIsTimeoutOfBreak(breakSeconds)) return

    setIsCounting(true)
  }

  const onPause = event => {
    if (!isCounting) return
    if (!isBreaking && checkIsTimeoutOfWork(workSeconds)) return
    if (isBreaking && checkIsTimeoutOfBreak(breakSeconds)) return

    setIsCounting(false)
  }

  return (
    <>
      <Typography.Title level='h1' fontWeight={700} align='center' marginBottom={10}>
        {title}
      </Typography.Title>

      <Task.ClockGroup size='md' align='center' estimateSeconds={estimateSeconds} workSeconds={workSeconds} />

      <div className={cx('timer__chart-wrapper')}>
        <Chart
          type='ring'
          // 休息模式，底的顏色為綠色
          // 工作模式，底的顏色為灰色
          ringColor={isBreaking ? '#b5e254' : '#acacac'}
          // 休息模式，而且在計時，轉的顏色為灰色
          // 休息模式，沒有在計時，轉的顏色為綠色
          // 工作模式，轉的顏色為紅色
          segmentColor={isBreaking ? (isCounting ? '#acacac' : '#b5e254') : '#ea5548'}
          percentage={percentage}
          text={formatSeconds(seconds)}
        />
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
          <Typography.Text prefix={<img src={CheckSVG} alt='complete' />} prefixMarginRight={5} lineHeight={1} letterSpacing='.1em' fontWeight={700}>
            TASK COMPLETE
          </Typography.Text>
        </button>
      </div>
    </>
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
  setWorkSeconds: ({ id, workSeconds }) => operations.updateItemInList({ keyName: 'id', key: id, item: { workSeconds } }),
  setBreakSeconds: ({ id, breakSeconds }) => operations.updateItemInList({ keyName: 'id', key: id, item: { breakSeconds } }),
  setIsBreaking: ({ id, isBreaking }) => operations.updateItemInList({ keyName: 'id', key: id, item: { isBreaking } }),
  addWorkHistory: operations.addWorkHistory,
  setIsCounting: operations.setIsCounting,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

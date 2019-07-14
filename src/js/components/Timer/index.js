import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

// Components
import Button from '../Button'
import Chart from '../Chart'
import Icon from '../Icon'
import { propTypes as TaskPropTypes } from '../Task'
import Typography from '../Typography'

// Modules
import { selectors, operations } from '../../lib/redux/modules/task'
import { filterByArchived, filterByComplete } from '../../lib/redux/modules/task/utils'

// Assets
import CheckSVG from '../../../assets/images/icons/Check.svg'
import TomatoSVG from '../../../assets/images/icons/Tomato.svg'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)
const totalSeconds = 0.1 * 60

export const propTypes = {
  uncompleteTasks: PropTypes.arrayOf(TaskPropTypes.task),
  // updatePassedSeconds: PropTypes.func,
}

function Timer (props) {
  const { uncompleteTasks } = props
  // const { updatePassedSeconds } = props
  // console.log('uncompleteTasks :', uncompleteTasks)
  const [isActive, setIsActive] = useState(false)
  const [passedSeconds, setPassedSeconds] = useState(0)
  const intervalId = useRef(null)

  const remainingSeconds = totalSeconds - passedSeconds
  const timerMinutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0')
  const timerSeconds = String(remainingSeconds % 60).padStart(2, '0')

  const isTimeout = passedSeconds >= totalSeconds
  const percentage = (passedSeconds / totalSeconds) * 100

  useEffect(() => {
    if (isActive && !isTimeout) {
      intervalId.current = setInterval(() => {
        setPassedSeconds(passedSeconds + 1)
        // updatePassedSeconds(passedSeconds + 1)
      }, 1000)
    }

    return () => {
      clearInterval(intervalId.current)
    }
  }, [isActive, isTimeout, passedSeconds])

  const onPlay = event => (isActive && isTimeout ? null : setIsActive(true))
  const onPause = event => (!isActive && isTimeout ? null : setIsActive(false))

  return (
    <div className={cx('timer')}>
      {uncompleteTasks.length > 0 ? (
        <>
          <Typography.Title level='h1' fontWeight={700} align='center'>
            My First Task
          </Typography.Title>

          <div>
            <div style={{ width: 12, height: 12 }}>
              <Chart type='pie' percentage={70} />
            </div>
          </div>

          <div className={cx('timer__chart-wrapper')}>
            <Chart type='ring' percentage={percentage === 100 ? percentage + 1 : percentage} text={`${timerMinutes}:${timerSeconds}`} />
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

          <button className={cx('timer__complete-button')} type='button' onClick={null}>
            <Typography.Text prefix={<img src={CheckSVG} alt='complete' />} prefixMarginRight={5} letterSpacing='.1em' fontWeight={700}>
              TASK COMPLETE
            </Typography.Text>
          </button>
        </>
      ) : (
        <>
          <div className={cx('timer__empty-image-wrapper')}>
            <Typography.Title color='white' letterSpacing='.15em' fontWeight={300} align='center' marginBottom={0}>
              PODOMORO
            </Typography.Title>
            <img className={cx('timer__empty-image')} src={TomatoSVG} alt='tomato' />
          </div>

          <Typography.Text marginTop={50} letterSpacing='.1em'>
            You don’t have any task now,
            <br />
            please add task first!
          </Typography.Text>
        </>
      )}
    </div>
  )
}

Timer.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    uncompleteTasks: filterByComplete(filterByArchived(selectors.getList(state, props), false), false),
  }
}

const mapDispatchToProps = {
  updatePassedSeconds: ({ id, passedSeconds }) => operations.updateItemInList({ keyName: 'id', key: id, item: { passedSeconds } }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

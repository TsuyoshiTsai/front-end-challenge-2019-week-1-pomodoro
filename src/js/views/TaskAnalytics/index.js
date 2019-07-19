import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'
import { subWeeks, addWeeks, startOfWeek, endOfWeek, eachDayOfInterval, isSameYear, isSameMonth, isSameDay, isSameWeek, format } from 'date-fns'

// Components
import Button from '../../components/Button'
import Typography from '../../components/Typography'
import { propTypes as TaskPropTypes } from '../../components/Task'

// Style
import styles from './style.module.scss'

// Modules
import { selectors } from '../../lib/redux/modules/task'

// Variables / Functions
const cx = classnames.bind(styles)
const isSameDate = (first, second) => isSameYear(first, second) && isSameMonth(first, second) && isSameDay(first, second)
const today = new Date()
const startOfThisWeek = startOfWeek(today)
const endOfThisWeek = endOfWeek(today)
const formatDate = date => format(date, 'MM/dd')

export const propTypes = {
  tasks: PropTypes.arrayOf(TaskPropTypes.task),
}

function TaskAnalytics (props) {
  const { tasks } = props

  const [period, setPeriod] = useState({ start: startOfThisWeek, end: endOfThisWeek })
  const periodInterval = eachDayOfInterval(period)

  const histories = tasks.reduce((acc, task) => [...acc, ...task.workHistory], [])

  return (
    <>
      <Typography.Title level='h1' color='white' marginBottom={0} letterSpacing='.1em'>
        ANALYTICS REPORT
      </Typography.Title>

      <Typography.Hr marginTop={25} marginBottom={25} />

      <Typography.Title level='h5' color='gray-light' fontWeight={700} marginBottom={10}>
        TOMATO OF THIS WEEK
      </Typography.Title>

      <div className={cx('task-analytics__panel', 'task-analytics__row')}>
        <div className={cx('task-analytics__column')}>
          <Typography.Text color='primary' fontSize={50} fontWeight={700} marginBottom={0} lineHeight={1.2}>
            {histories.filter(time => isSameDate(time, today)).length}
          </Typography.Text>
          <Typography.Text color='white' fontSize={10} lineHeight={1}>
            TODAY
          </Typography.Text>
        </div>
        <div className={cx('task-analytics__column')}>
          <Typography.Text color='primary' fontSize={50} fontWeight={700} marginBottom={0} lineHeight={1.2}>
            {histories.filter(time => isSameWeek(time, today)).length}
          </Typography.Text>
          <Typography.Text color='white' fontSize={10} lineHeight={1}>
            {formatDate(startOfThisWeek)}-{formatDate(endOfThisWeek)}
          </Typography.Text>
        </div>
      </div>

      <Typography.Hr marginTop={25} marginBottom={25} />

      <Typography.Title level='h4' color='gray-light' fontWeight={700} marginBottom={10}>
        CHART
        <Typography.Text fontSize={10} color='white' marginBottom={0} style={{ marginLeft: 2 }}>
          {formatDate(period.start)}-{formatDate(period.end)}
        </Typography.Text>
      </Typography.Title>

      <div className={cx('task-analytics__chart-wrapper')}>
        <div className={cx('task-analytics__panel', 'task-analytics__chart')}>
          <div className={cx('task-analytics__grid')}>
            {periodInterval.map((date, index) => {
              const dateHistories = histories.filter(time => isSameDate(time, date))

              return (
                <div key={index} className={cx('task-analytics__count-wrapper')}>
                  {dateHistories.length > 0 && (
                    <Typography.Text color='primary' lineHeight={1} fontWeight={700} align='center' marginBottom={5}>
                      {dateHistories.length}
                    </Typography.Text>
                  )}
                  {dateHistories.map((time, index) => (
                    <span key={index} className={cx('task-analytics__count')} />
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        <div className={cx('task-analytics__grid', 'task-analytics__week')}>
          {periodInterval.map((date, index) => (
            <span key={index} className={cx('task-analytics__date')}>
              <Typography.Text fontSize={10} color='white' lineHeight={1}>
                {formatDate(date)}
              </Typography.Text>
              <Typography.Text fontSize={8} fontWeight={700} color='gray-light' lineHeight={1} marginTop={2}>
                {format(date, 'EEE').toUpperCase()}
              </Typography.Text>
            </span>
          ))}
        </div>
      </div>

      <div className={cx('task-analytics__navigation-wrapper')}>
        <Button
          size='sm'
          shape='rounded'
          isFilled={false}
          width={100}
          onClick={event => setPeriod({ start: subWeeks(period.start, 1), end: subWeeks(period.end, 1) })}
        >
          PREV
        </Button>
        <Button
          size='sm'
          shape='rounded'
          isFilled={false}
          width={100}
          disabled={isSameDate(period.end, endOfThisWeek)}
          onClick={event => setPeriod({ start: addWeeks(period.start, 1), end: addWeeks(period.end, 1) })}
        >
          NEXT
        </Button>
      </div>
    </>
  )
}

TaskAnalytics.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    tasks: selectors.getList(state, props),
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskAnalytics)

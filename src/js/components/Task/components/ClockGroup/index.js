import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Chart from '../../../Chart'

// Modules
import { getPercentageOfWork, getClocksOfWork } from '../../../../lib/redux/modules/task/utils'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  size: PropTypes.oneOf(['sm', 'md']),
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  estimateSeconds: PropTypes.number,
  workSeconds: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  size: 'sm',
  align: 'flex-start',
}

function ClockGroup (props) {
  const { size, align, estimateSeconds, workSeconds, className, style, ...restProps } = props

  const estimateClocks = getClocksOfWork(estimateSeconds)
  const workClocks = getClocksOfWork(workSeconds)
  const percentage = getPercentageOfWork(workSeconds)

  return (
    <div className={cx('task-clock-group', className)} style={{ justifyContent: align, ...style }} data-size={size} {...restProps}>
      {new Array(estimateClocks)
        .fill()
        // 先填滿所有估計的時鐘（空）
        .map((empty, index) => <Chart key={index} type='pie' percentage={0} />)
        // 如果位置小於經過的時鐘數量，就用全滿的時鐘；否則就用估計的時鐘
        .map((estimateClock, index) => (index < workClocks ? <Chart key={index} type='pie' percentage={100} /> : estimateClock))
        // 如果位置等於經過的時鐘數量，且百分比小於一百，就用百分比的時鐘；否則就用原本的時鐘
        .map((clock, index) => (index === workClocks && percentage < 100 ? <Chart key={index} type='pie' percentage={percentage} /> : clock))}
    </div>
  )
}

ClockGroup.propTypes = propTypes
ClockGroup.defaultProps = defaultProps

export default ClockGroup

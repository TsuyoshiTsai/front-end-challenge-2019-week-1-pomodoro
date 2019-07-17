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
  align: PropTypes.oneOf(['left', 'center', 'right']),
  estimateSeconds: PropTypes.number,
  workFinishCount: PropTypes.number,
  workSeconds: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  size: 'sm',
  align: 'left',
}

function ClockGroup (props) {
  const { size, align, estimateSeconds, workFinishCount, workSeconds, className, style, ...restProps } = props

  const estimateClocks = getClocksOfWork(estimateSeconds)
  const percentage = getPercentageOfWork(workSeconds)

  return (
    <div className={cx('task-clock-group', className)} style={{ textAlign: align, ...style }} data-size={size} {...restProps}>
      {/* 如果工作結束的次數大於等於估計的時鐘數，用工作結束次數；否則用估計時鐘數 */}
      {workFinishCount >= estimateClocks
        ? new Array(workFinishCount)
          .fill()
        // 填滿工作結束的時鐘（滿）
          .map((empty, index) => <Chart key={index} type='pie' percentage={100} />)
        // 最後加入一筆目前的百分比
          .concat([<Chart key={workFinishCount} type='pie' percentage={percentage} />])
        : new Array(estimateClocks)
          .fill()
        // 先填滿所有估計的時鐘（空）
          .map((empty, index) => <Chart key={index} type='pie' percentage={0} />)
        // 如果位置小於工作結束的次數，就用全滿的時鐘；否則就用估計的時鐘
          .map((estimateClock, index) => (index < workFinishCount ? <Chart key={index} type='pie' percentage={100} /> : estimateClock))
        // 如果位置等於工作結束的次數，就用百分比的時鐘；否則就用原本的時鐘
          .map((clock, index) => (index === workFinishCount ? <Chart key={index} type='pie' percentage={percentage} /> : clock))}
    </div>
  )
}

ClockGroup.propTypes = propTypes
ClockGroup.defaultProps = defaultProps

export default ClockGroup

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Spring } from 'react-spring/renderprops'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)
// const strokeWidth

export const propTypes = {
  percentage: PropTypes.number,
  text: PropTypes.node,
  textFontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeWidth: PropTypes.number,
  ringColor: PropTypes.string,
  centerColor: PropTypes.string,
  segmentColor: PropTypes.string,
}

export const defaultProps = {
  percentage: 0,
  textFontSize: 40,
  strokeWidth: 50,
  ringColor: '#acacac',
  centerColor: '#fcfcfc',
  segmentColor: '#ea5548',
}

function Chart (props) {
  const { percentage, text, textFontSize, strokeWidth, ringColor, centerColor, segmentColor } = props

  const realStrokeWidth = strokeWidth / 2 / 2.2

  return (
    <svg className={cx('chart')} viewBox='0 0 32 32'>
      {/* ring */}
      <circle r='16' cx='16' cy='16' fill={centerColor} stroke={ringColor} strokeWidth={realStrokeWidth} />
      {/* segment */}
      <Spring to={{ percentage }}>
        {({ percentage }) => (
          <circle
            r='16'
            cx='16'
            cy='16'
            fill='transparent'
            stroke={segmentColor}
            strokeWidth={realStrokeWidth}
            strokeDasharray={`${percentage} 100`}
          />
        )}
      </Spring>

      {/* text */}
      <text
        className={cx('chart__number')}
        x='50%'
        y='50%'
        fontSize={(textFontSize / 16) * 1.72}
        fontWeight={700}
        textAnchor='middle'
        dominantBaseline='middle'
      >
        {text}
      </text>
    </svg>
  )
}

Chart.propTypes = propTypes
Chart.defaultProps = defaultProps

export default Chart

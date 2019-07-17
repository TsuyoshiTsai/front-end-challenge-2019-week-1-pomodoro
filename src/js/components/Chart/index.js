import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Spring } from 'react-spring/renderprops'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)
const TYPE = { RING: 'ring', PIE: 'pie' }

export const propTypes = {
  type: PropTypes.oneOf(Object.values(TYPE)),
  percentage: PropTypes.number,
  text: PropTypes.node,
  textFontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeWidth: PropTypes.number,
  isFlipped: PropTypes.bool,
  ringColor: PropTypes.string,
  centerColor: PropTypes.string,
  segmentColor: PropTypes.string,
  className: PropTypes.string,
}

export const defaultProps = {
  type: TYPE.RING,
  percentage: 0,
  textFontSize: 40,
  strokeWidth: 50,
  isFlipped: false,
  ringColor: '#acacac',
  centerColor: '#fcfcfc',
  segmentColor: '#ea5548',
}

function Chart (props) {
  const { type, percentage, text, textFontSize, strokeWidth, isFlipped, ringColor, centerColor, segmentColor, className } = props

  const realStrokeWidth = Math.ceil(((strokeWidth / 100) * 32) / 1.5)

  return (
    <svg className={cx('chart', className)} data-is-flipped={isFlipped} role='chart' viewBox='0 0 32 32'>
      {/* ring */}
      <circle
        r='15.9'
        cx='15.9'
        cy='15.9'
        fill={type === TYPE.RING ? centerColor : type === TYPE.PIE && 'transparent'}
        stroke={type === TYPE.RING ? ringColor : type === TYPE.PIE && segmentColor}
        strokeWidth={realStrokeWidth}
      />

      {/* segment */}
      <Spring to={{ percentage, segmentColor }}>
        {({ percentage, segmentColor }) => (
          <circle
            r='15.9'
            cx='15.9'
            cy='15.9'
            fill='transparent'
            stroke={segmentColor}
            strokeWidth={type === TYPE.RING ? realStrokeWidth : type === TYPE.PIE && 32}
            strokeDasharray={`${percentage} 100`}
          />
        )}
      </Spring>

      {/* text */}
      {typeof text === 'string' && (
        <text
          className={cx('chart__number')}
          data-is-flipped={isFlipped}
          x='50%'
          y='50%'
          fontSize={(textFontSize / 16) * 1.72}
          fontWeight={700}
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {text}
        </text>
      )}
    </svg>
  )
}

Chart.propTypes = propTypes
Chart.defaultProps = defaultProps

export default Chart

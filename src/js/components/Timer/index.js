import React from 'react'
import classnames from 'classnames/bind'

// Components
import Button from '../Button'
import Chart from '../Chart'
import Icon from '../Icon'
import Typography from '../Typography'

// Assets
import CheckSVG from '../../../assets/images/icons/Check.svg'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

function Timer (params) {
  return (
    <div className={cx('timer')}>
      <Typography.Title level='h1' fontWeight={700} align='center'>
        My First Task
      </Typography.Title>

      <div>0000</div>

      <div className={cx('timer__chart-wrapper')}>
        <Chart percentage={91} text='25:00' />
      </div>

      <div className={cx('timer__action-list')}>
        <Button shape='circle'>
          <Icon name='play' mode='01' />
        </Button>

        <Button shape='circle'>
          <Icon name='pause' mode='01' />
        </Button>

        <Button shape='circle'>
          <Icon name='arrow-round' mode='01' />
        </Button>
      </div>

      <button className={cx('timer__complete-button')} type='button' onClick={null}>
        <Typography.Text prefix={<img src={CheckSVG} alt='complete' />} prefixMarginRight={5} letterSpacing='.1em' fontWeight={700}>
          TASK COMPLETE
        </Typography.Text>
      </button>
    </div>
  )
}

export default Timer

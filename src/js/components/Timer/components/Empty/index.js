import React from 'react'
import classnames from 'classnames/bind'

// Components
import Typography from '../../../Typography'

// Assets
import TomatoSVG from '../../../../../assets/images/icons/Tomato.svg'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

function Empty (props) {
  return (
    <div className={cx('timer-empty')}>
      <div className={cx('timer-empty__image-wrapper')}>
        <Typography.Title color='white' letterSpacing='.15em' fontWeight={300} align='center' marginBottom={0}>
          PODOMORO
        </Typography.Title>
        <img className={cx('timer-empty__image')} src={TomatoSVG} alt='tomato' />
      </div>
      <Typography.Text marginTop={50} letterSpacing='.1em'>
        You don’t have any task now,
        <br />
        please add task first!
      </Typography.Text>
    </div>
  )
}

export default Empty

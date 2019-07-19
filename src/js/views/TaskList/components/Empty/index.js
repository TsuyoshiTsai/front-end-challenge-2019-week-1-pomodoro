import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames/bind'

// Components
import Button from '../../../../components/Button'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  history: PropTypes.object,
}

function Empty (props) {
  const { history } = props

  return (
    <div className={cx('task-list-empty')}>
      <p className={cx('task-list-empty__description')}>No Tasks</p>
      <Button type='primary' shape='rounded' size='sm' onClick={event => history.push('/task/add')}>
        GO TO ADD
      </Button>
    </div>
  )
}

Empty.propTypes = propTypes

export default withRouter(Empty)

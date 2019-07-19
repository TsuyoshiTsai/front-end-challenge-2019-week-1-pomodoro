import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

// Components
import Chart from '../../components/Chart'
import Typography from '../../components/Typography'
import Radio from '../../components/Radio'
import Icon from '../../components/Icon'
import List from '../../components/List'

// Modules
import { selectors, operations } from '../../lib/redux/modules/audio'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)
// const TaskGroupWithEmpty = withEmpty(Task.Group)
const TYPE = { WORK: 'WORK', BREAK: 'BREAK' }
const tabs = [{ label: 'WORK', value: TYPE.WORK }, { label: 'BREAK', value: TYPE.BREAK }]

export const propTypes = {
  audios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  workAudio: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    path: PropTypes.string,
  }),
  breakAudio: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    path: PropTypes.string,
  }),
  workId: PropTypes.string,
  breakId: PropTypes.string,
  setWorkId: PropTypes.func,
  setBreakId: PropTypes.func,
}

function RingTone (props) {
  const { audios, workId, breakId, setWorkId, setBreakId } = props

  const audioRef = useRef(null)
  const [currentAudio, setCurrentAudio] = useState(null)
  const [currentType, setCurrentType] = useState(tabs[0].value)
  const currentId = currentType === TYPE.WORK ? workId : currentType === TYPE.BREAK && breakId
  const currentAction = currentType === TYPE.WORK ? setWorkId : currentType === TYPE.BREAK && setBreakId

  const onRadioChange = (event, value) => {
    if (audioRef.current !== null && !audioRef.current.paused) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    setCurrentType(value)
  }

  const onAudioPlay = audio => {
    // 如果已經選了，而且正在播放中，就暫停
    // 如果已經選了，而且已經選的和新選的一樣且暫停中，就播放
    if (audioRef.current !== null && !audioRef.current.paused) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    } else if (audioRef.current !== null && currentAudio.id === audio.id && audioRef.current.paused) {
      audioRef.current = new Audio(audio.path)
      audioRef.current.play()
    }

    // 如果還沒選，或是已經選的和新選的不同，就播放
    if (audioRef.current === null || currentAudio.id !== audio.id) {
      audioRef.current = new Audio(audio.path)
      audioRef.current.play()
    }

    // force re-render
    setCurrentAudio({ ...audio })
  }

  return (
    <>
      <Typography.Title level='h1' color='white' marginBottom={0} letterSpacing='.1em'>
        TASK LISTS
      </Typography.Title>

      <Typography.Hr marginTop={25} marginBottom={25} />

      <Radio.Group mode='tab' value={currentType} onChange={onRadioChange}>
        {tabs.map((tab, index) => (
          <Radio key={index} value={tab.value}>
            {tab.label}
          </Radio>
        ))}
      </Radio.Group>

      <List>
        {audios.map((audio, index) => (
          <List.Item
            key={index}
            isSelectable
            prefix={<Chart type='pie' percentage={audio.id === currentId ? 100 : 0} className={cx('ring-tone__item-prefix')} />}
            suffix={
              <span
                className={cx('ring-tone__item-suffix')}
                data-is-playing={currentAudio !== null && currentAudio.id === audio.id && !audioRef.current.paused}
              >
                <span className={cx('ring-tone__item-suffix-icon')}>
                  {currentAudio !== null && currentAudio.id === audio.id && !audioRef.current.paused ? (
                    <Icon name='pause' mode='02' />
                  ) : (
                    <Icon name='play' mode='02' />
                  )}
                </span>
                <Chart type='ring' centerColor='transparent' strokeWidth={30} segmentColor='#fff' percentage={100} />
              </span>
            }
            onClick={event => {
              currentAction(audio.id)
              onAudioPlay(audio)
            }}
          >
            {audio.title}
          </List.Item>
        ))}
      </List>
    </>
  )
}

RingTone.propTypes = propTypes

const mapStateToProps = (state, props) => {
  return {
    audios: selectors.getList(state, props),
    workAudio: selectors.getWorkAudio(state, props),
    breakAudio: selectors.getBreakAudio(state, props),
    workId: selectors.getWorkId(state, props),
    breakId: selectors.getBreakId(state, props),
  }
}

const mapDispatchToProps = {
  setWorkId: operations.setWorkId,
  setBreakId: operations.setBreakId,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RingTone)

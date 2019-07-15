import compareAsc from 'date-fns/compareAsc'
import compareDesc from 'date-fns/compareDesc'

import { SECONDS_OF_CLOCK } from '../../../../constants/Time'

export const sortByCreatedDateTime = (list, type = 'desc') =>
  list.sort((prev, next) =>
    (type === 'asc' ? compareAsc : type === 'desc' && compareDesc)(new Date(prev.createdDateTime), new Date(next.createdDateTime))
  )

export const filterByArchived = (list, isArchived) => list.filter(item => item.isArchived === isArchived)

export const filterByComplete = (list, isComplete) => list.filter(item => item.isComplete === isComplete)

export const getPassedSecondsOfClock = passedSeconds =>
  passedSeconds > 0 && passedSeconds === SECONDS_OF_CLOCK ? SECONDS_OF_CLOCK : passedSeconds % SECONDS_OF_CLOCK

export const getPassedClocksBySeconds = passedSeconds => Math.floor(passedSeconds / SECONDS_OF_CLOCK)

export const getRemainingSecondsOfClock = passedSeconds => SECONDS_OF_CLOCK - getPassedSecondsOfClock(passedSeconds)

export const getPercentageOfClock = passedSeconds => (getPassedSecondsOfClock(passedSeconds) / SECONDS_OF_CLOCK) * 100

export const checkIsTimeout = passedSeconds => getPassedSecondsOfClock(passedSeconds) >= SECONDS_OF_CLOCK

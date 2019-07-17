import compareAsc from 'date-fns/compareAsc'
import compareDesc from 'date-fns/compareDesc'

import { WORK_SECONDS_OF_CLOCK, BREAK_SECONDS_OF_CLOCK, SECONDS_OF_MINUTE } from '../../../../constants/Time'

export const sortByCreatedDateTime = (list, type = 'desc') =>
  list.sort((prev, next) =>
    (type === 'asc' ? compareAsc : type === 'desc' && compareDesc)(new Date(prev.createdDateTime), new Date(next.createdDateTime))
  )

export const filterByArchived = (list, isArchived) => list.filter(item => item.isArchived === isArchived)

export const filterByComplete = (list, isComplete) => list.filter(item => item.isComplete === isComplete)

export const getSecondsOfClock = (secondsOfClock, clocks) => secondsOfClock * clocks
export const getSecondsOfWork = getSecondsOfClock.bind(null, WORK_SECONDS_OF_CLOCK)
export const getSecondsOfBreak = getSecondsOfClock.bind(null, BREAK_SECONDS_OF_CLOCK)

export const getClocksOfClock = (secondsOfClock, seconds) => Math.floor(seconds / secondsOfClock)
export const getClocksOfWork = getClocksOfClock.bind(null, WORK_SECONDS_OF_CLOCK)
export const getClocksOfBreak = getClocksOfClock.bind(null, BREAK_SECONDS_OF_CLOCK)

export const getPassedSecondsOfClock = (secondsOfClock, seconds) => seconds % secondsOfClock
export const getPassedSecondsOfWork = getPassedSecondsOfClock.bind(null, WORK_SECONDS_OF_CLOCK)
export const getPassedSecondsOfBreak = getPassedSecondsOfClock.bind(null, BREAK_SECONDS_OF_CLOCK)

export const getRemainingSecondsOfClock = (secondsOfClock, seconds) => secondsOfClock - getPassedSecondsOfClock(secondsOfClock, seconds)
export const getRemainingSecondsOfWork = getRemainingSecondsOfClock.bind(null, WORK_SECONDS_OF_CLOCK)
export const getRemainingSecondsOfBreak = getRemainingSecondsOfClock.bind(null, BREAK_SECONDS_OF_CLOCK)

export const getPercentage = (secondsOfClock, seconds) => (getPassedSecondsOfWork(seconds) / secondsOfClock) * 100
export const getPercentageOfWork = getPercentage.bind(null, WORK_SECONDS_OF_CLOCK)
export const getPercentageOfBreak = getPercentage.bind(null, BREAK_SECONDS_OF_CLOCK)

export const checkIsTimeoutOfClock = (secondsOfClock, seconds) => seconds > 0 && seconds === secondsOfClock
export const checkIsTimeoutOfWork = checkIsTimeoutOfClock.bind(null, WORK_SECONDS_OF_CLOCK)
export const checkIsTimeoutOfBreak = checkIsTimeoutOfClock.bind(null, BREAK_SECONDS_OF_CLOCK)

export const parseToTwoChar = number => String(number).padStart(2, '0')

export const formatSeconds = seconds => `${parseToTwoChar(Math.floor(seconds / SECONDS_OF_MINUTE))}:${parseToTwoChar(seconds % SECONDS_OF_MINUTE)}`

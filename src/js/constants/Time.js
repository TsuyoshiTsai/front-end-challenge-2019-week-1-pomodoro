export const SECONDS_OF_MINUTE = 60

export const MAX_WORK_MINUTES = 25

export const MAX_BREAK_MINUTES = 5

const getLastSeconds = type => localStorage.getItem(type)

if (getLastSeconds('WORK_SECONDS_OF_CLOCK') === null) {
  localStorage.setItem('WORK_SECONDS_OF_CLOCK', SECONDS_OF_MINUTE * MAX_WORK_MINUTES)
}

if (getLastSeconds('BREAK_SECONDS_OF_CLOCK') === null) {
  localStorage.setItem('BREAK_SECONDS_OF_CLOCK', SECONDS_OF_MINUTE * MAX_BREAK_MINUTES)
}

export const WORK_SECONDS_OF_CLOCK = JSON.parse(getLastSeconds('WORK_SECONDS_OF_CLOCK'))

export const BREAK_SECONDS_OF_CLOCK = JSON.parse(getLastSeconds('BREAK_SECONDS_OF_CLOCK'))

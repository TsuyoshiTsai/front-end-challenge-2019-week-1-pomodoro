import { MODULE_NAME } from './constants'

// list
export const getList = (state, props) => state[MODULE_NAME].list

export const getItemById = (state, props) => getList(state, props).find(item => item.id === props.id) || null

// status
export const getStatusValue = (state, props) => state[MODULE_NAME].status[props.keyName]

export const getWorkId = (state, props) => getStatusValue(state, { keyName: 'workId' })

export const getBreakId = (state, props) => getStatusValue(state, { keyName: 'breakId' })

// combo
export const getWorkAudio = (state, props) => getItemById(state, { ...props, id: getWorkId(state, props) })

export const getBreakAudio = (state, props) => getItemById(state, { ...props, id: getBreakId(state, props) })

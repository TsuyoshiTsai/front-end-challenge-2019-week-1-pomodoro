import { MODULE_NAME } from './constants'

// list
export const getList = (state, props) => state[MODULE_NAME].list

export const getItemById = (state, props) => getList(state, props).find(item => item.id === props.id) || null

// status
export const getStatusValue = (state, props) => state[MODULE_NAME].status[props.keyName]

export const getCurrentId = (state, props) => getStatusValue(state, { keyName: 'currentId' })

export const getIsCounting = (state, props) => getStatusValue(state, { keyName: 'isCounting' })

// combo
export const getCurrentTask = (state, props) => getList(state, props).find(task => task.id === getCurrentId(state, props)) || null

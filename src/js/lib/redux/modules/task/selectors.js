import { MODULE_NAME } from './constants'
import { sortByCreatedDateTime } from './utils'

// list
export const getList = (state, props) => state[MODULE_NAME].list

export const getListBySorting = (state, { type = 'desc', ...props }) => sortByCreatedDateTime(getList(state, props), type)

export const getItemById = (state, props) => getList(state, props).find(item => item.id === props.id)

// status
export const getStatusValue = (state, props) => state[MODULE_NAME].status[props.keyName]

export const getCurrentId = (state, props) => getStatusValue(state, { keyName: 'currentId' })

export const getIsCounting = (state, props) => getStatusValue(state, { keyName: 'isCounting' })

// combo
export const getCurrentTask = (state, props) => getList(state, props).find(task => task.id === getCurrentId(state, props)) || null

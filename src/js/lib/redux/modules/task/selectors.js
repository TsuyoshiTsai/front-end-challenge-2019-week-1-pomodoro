import { MODULE_NAME } from './constants'
import { sortByCreatedDateTime } from './utils'

export const getList = (state, props) => state[MODULE_NAME].list

export const getListBySorting = (state, { type = 'desc', ...props }) => sortByCreatedDateTime(getList(state, props), type)

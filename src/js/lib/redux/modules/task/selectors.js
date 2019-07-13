import compareAsc from 'date-fns/compareAsc'
import compareDesc from 'date-fns/compareDesc'
import { MODULE_NAME } from './constants'

export const getList = (state, props) => state[MODULE_NAME].list

export const getListBySorting = (state, { sortBy = 'desc', ...props }) =>
  getList(state, props).sort((prev, next) =>
    (sortBy === 'asc' ? compareAsc : sortBy === 'desc' && compareDesc)(new Date(prev.createdDateTime), new Date(next.createdDateTime))
  )

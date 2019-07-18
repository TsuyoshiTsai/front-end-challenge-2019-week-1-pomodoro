// Separate the thunks from the action creators
// If the operation only dispatches a single action — forward the action creator function.
// If the operation uses a thunk, it can dispatch many actions and chain them with promises.
import * as actions from './actions'
import { getList, getItemById } from './selectors'
import { sortByCreatedDateTime, filterByArchived, filterByComplete } from './utils'

const getNextTaskId = (currentId, list) =>
  (
    sortByCreatedDateTime(filterByComplete(filterByArchived(getList(list).filter(task => task.id !== currentId), false), false), 'desc')[0] || {
      id: null,
    }
  ).id

// list
export const addItemToList = actions.addItemToList

export const updateItemInList = actions.updateItemInList

export const archiveTask = ({ id }) => (dispatch, getStatus) => {
  dispatch(updateItemInList({ keyName: 'id', key: id, item: { isArchived: true } }))
  dispatch(setCurrentId(getNextTaskId(id, getStatus())))
}

export const unarchiveTask = ({ id }) => updateItemInList({ keyName: 'id', key: id, item: { isArchived: false } })

export const completeTask = ({ id }) => (dispatch, getStatus) => {
  dispatch(updateItemInList({ keyName: 'id', key: id, item: { isComplete: true } }))
  dispatch(setCurrentId(getNextTaskId(id, getStatus())))
}

export const uncompleteTask = ({ id }) => updateItemInList({ keyName: 'id', key: id, item: { isComplete: false } })

export const addWorkHistory = ({ id, finishDateTime }) => (dispatch, getStatus) => {
  dispatch(updateItemInList({ keyName: 'id', key: id, item: { workHistory: [...getItemById(getStatus(), { id }).workHistory, finishDateTime] } }))
}

// status
export const setStatusValue = actions.setStatusValue

export const setCurrentId = id => setStatusValue({ keyName: 'currentId', value: id })

export const setIsCounting = isCounting => setStatusValue({ keyName: 'isCounting', value: isCounting })

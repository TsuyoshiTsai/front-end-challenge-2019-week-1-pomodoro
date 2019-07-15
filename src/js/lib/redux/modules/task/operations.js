// Separate the thunks from the action creators
// If the operation only dispatches a single action — forward the action creator function.
// If the operation uses a thunk, it can dispatch many actions and chain them with promises.
import * as actions from './actions'

// list
export const addItemToList = actions.addItemToList

export const updateItemInList = actions.updateItemInList

export const archiveTask = ({ id }) => (dispatch, getStatus) => {
  dispatch(updateItemInList({ keyName: 'id', key: id, item: { isArchived: true } }))
  dispatch(setCurrentId(null))
}

// status
export const setStatusValue = actions.setStatusValue

export const setCurrentId = id => setStatusValue({ keyName: 'currentId', value: id })

export const setIsCounting = isCounting => setStatusValue({ keyName: 'isCounting', value: isCounting })

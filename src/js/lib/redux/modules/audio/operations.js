// Separate the thunks from the action creators
// If the operation only dispatches a single action — forward the action creator function.
// If the operation uses a thunk, it can dispatch many actions and chain them with promises.
import * as actions from './actions'

// status
export const setStatusValue = actions.setStatusValue

export const setWorkId = id => setStatusValue({ keyName: 'workId', value: id })

export const setBreakId = id => setStatusValue({ keyName: 'breakId', value: id })

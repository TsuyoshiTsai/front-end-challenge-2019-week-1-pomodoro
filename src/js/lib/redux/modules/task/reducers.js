import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer'
import { tasks } from './mock'
import * as actionTypes from './actionTypes'
import * as reducerOperators from '../reducer-operators'

// list
const initialStateList = tasks

const list = createReducer(initialStateList, {
  [actionTypes.ADD_ITEM_TO_LIST]: (state, { isBefore, payload }) => reducerOperators.addItemToList(state, payload, isBefore),
  [actionTypes.UPDATE_ITEM_IN_LIST]: (state, { keyName, key, payload }) => reducerOperators.updateItemInList(state, keyName, key, payload),
})

// status
const initialStateStatus = {
  currentId: 'c53f78ff-8a00-4aac-85fd-3dbae39a5255',
  isCounting: false,
}

const status = createReducer(initialStateStatus, {
  [actionTypes.STATUS_SET_ITEM]: (state, { payload }) => reducerOperators.setItem(state, payload.keyName, payload.value),
})

export default combineReducers({ list, status })

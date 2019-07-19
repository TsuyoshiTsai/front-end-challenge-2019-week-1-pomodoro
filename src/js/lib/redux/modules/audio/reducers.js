import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer'
import { audios } from './mock'
import * as actionTypes from './actionTypes'
import * as reducerOperators from '../reducer-operators'

// list
const initialStateList = audios

const list = createReducer(initialStateList, {})

// status
const initialStateStatus = {
  workId: audios[0].id,
  breakId: audios[1].id,
}

const status = createReducer(initialStateStatus, {
  [actionTypes.STATUS_SET_ITEM]: (state, { payload }) => reducerOperators.setItem(state, payload.keyName, payload.value),
})

export default combineReducers({ list, status })

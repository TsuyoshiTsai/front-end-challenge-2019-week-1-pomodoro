import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer'
import * as actionTypes from './actionTypes'
import * as reducerOperators from '../reducer-operators'

const initialState = []

const list = createReducer(initialState, {
  [actionTypes.ADD_ITEM_TO_LIST]: (state, { isBefore, payload }) => reducerOperators.addItemToList(state, payload, isBefore),
  [actionTypes.UPDATE_ITEM_IN_LIST]: (state, { keyName, key, payload }) => reducerOperators.updateItemInList(state, keyName, key, payload),
})

export default combineReducers({ list })
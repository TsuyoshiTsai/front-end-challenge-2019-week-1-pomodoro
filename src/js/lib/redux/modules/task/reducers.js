import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer'
import * as actionTypes from './actionTypes'
import * as reducerOperators from '../reducer-operators'

const initialState = []

const list = createReducer(initialState, {
  [actionTypes.ADD_ITEM_TO_LIST]: (state, { isBefore, payload }) => reducerOperators.addItemToList(state, payload, isBefore),
})

export default combineReducers({ list })

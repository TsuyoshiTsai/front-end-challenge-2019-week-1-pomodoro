// ** Simple Actions Creators (a function which return native object with type) **
// createItem: 從無到有 (null -> {...})
// setItem: 直接替換該筆資料 (null/{...} -> {...})
// updateItem: 融合現有資料更新 ({..., a, ...} -> {..., a, b,...})
// deleteItem: 移除一筆資料，資料將不存在 ({...} -> null)

// createList: 從無到有 (null -> [])
// setList: 直接替換該筆資料 (null/[...] -> [...])
// addItemToList: 將一筆資料加進列表 ([...] -> [..., a])
// addListToList: 將一個列表加進列表 ([...] -> [..., ...])
// updateItemInList: 融合現有資料更新 ([..., a, ...] -> [..., a, b, ...])
// removeItemFromList: 將一筆資料從列表中刪除 ([..., a, ...] -> [..., ...])
// deleteList: 移除列表，列表將不存在 ([...] -> null)
// clearList: 將列表中的資料移除，列表本身仍存在 ([...] -> [])

import * as actionGetters from '../action-getters'
import * as actionTypes from './actionTypes'

export const addItemToList = actionGetters.addItemToList(actionTypes.ADD_ITEM_TO_LIST)
export const updateItemInList = actionGetters.updateItemInList(actionTypes.UPDATE_ITEM_IN_LIST)

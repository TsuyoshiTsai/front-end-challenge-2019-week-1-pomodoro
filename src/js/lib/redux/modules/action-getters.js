export const setList = type => ({ list }) => ({
  type,
  payload: list,
})

export const addItemToList = type => ({ isBefore = false, item }) => ({
  type,
  isBefore,
  payload: item,
})

export const addListToList = type => ({ isBefore = false, list }) => ({
  type,
  isBefore,
  payload: list,
})

export const updateItemInList = type => ({ keyName, key, item }) => ({
  type,
  keyName,
  key,
  payload: item,
})

export const removeItemFromList = type => ({ keyName = 'id', key }) => ({
  type,
  payload: {
    keyName,
    key,
  },
})

export const setItem = type => ({ keyName, value }) => ({
  type,
  payload: {
    keyName,
    value,
  },
})

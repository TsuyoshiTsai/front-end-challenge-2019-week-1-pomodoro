export const setList = type => ({ list }) => ({
  type,
  payload: list,
})

export const addListToList = type => ({ isBefore = false, list }) => ({
  type,
  isBefore,
  payload: list,
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

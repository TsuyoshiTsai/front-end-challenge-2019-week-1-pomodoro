export const setItem = (item, keyName, value) => {
  const newItem = Array.isArray(item) ? [] : {}

  for (const [oldKeyName, oldValue] of Object.entries(item)) {
    const newValue = oldKeyName === keyName ? value : oldValue

    newItem[oldKeyName] = newValue
  }

  return newItem
}

export const addItemToList = (list, item, isBefore) => (isBefore ? [item, ...list] : [...list, item])

export const addListToList = (oldList, newList, isBefore) => (isBefore ? [...newList, ...oldList] : [...oldList, ...newList])

export const updateItemInList = (list, keyName, key, newItem) =>
  list.map((item, index) => {
    if (index === findItemIndexInList(list, keyName, key)) {
      return typeof item === 'object' ? Object.entries(newItem).reduce((acc, [keyName, value]) => setItem(acc, keyName, value), item) : newItem
    } else {
      return item
    }
  })

export const removeItemFromList = (list, keyName, key) => list.filter(item => item[keyName] !== key)

export const findItemIndexInList = (list, keyName, key) => list.findIndex(item => item[keyName] === key)

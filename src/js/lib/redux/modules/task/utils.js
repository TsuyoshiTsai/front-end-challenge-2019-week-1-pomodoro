import compareAsc from 'date-fns/compareAsc'
import compareDesc from 'date-fns/compareDesc'

export const sortByCreatedDateTime = (list, type = 'desc') =>
  list.sort((prev, next) =>
    (type === 'asc' ? compareAsc : type === 'desc' && compareDesc)(new Date(prev.createdDateTime), new Date(next.createdDateTime))
  )

export const filterByArchived = (list, isArchived) => list.filter(item => item.isArchived === isArchived)

export const filterByComplete = (list, isComplete) => list.filter(item => item.isComplete === isComplete)

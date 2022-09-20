import { createContext } from 'react'
import { AttendedEvents, IdToEventMap, Requirement } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: IdToEventMap
  onFetchAttendedEvents: () => void
  requirements: Requirement[]
}

const DatabaseContext = createContext<DatabaseContextValue>({
  attendedEvents: [],
  events: {},
  onFetchAttendedEvents: () => {},
  requirements: [],
})

export default DatabaseContext

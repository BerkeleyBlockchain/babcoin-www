import { createContext } from 'react'
import { AttendedEvents, IdToEventMap, Requirement } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: IdToEventMap
  requirements: Requirement[]
}

const DatabaseContext = createContext<DatabaseContextValue>({
  attendedEvents: [],
  events: {},
  requirements: [],
})

export default DatabaseContext

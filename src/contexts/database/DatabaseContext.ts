import { createContext } from 'react'
import { AttendedEvents, IdToEventMap, Requirement } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: IdToEventMap
  scores: any
  onFetchAttendedEvents: () => void
  onFetchScores: () => void
  requirements: Requirement[]
}

const DatabaseContext = createContext<DatabaseContextValue>({
  attendedEvents: [],
  events: {},
  scores: [],
  onFetchAttendedEvents: () => {},
  onFetchScores: () => {},
  requirements: [],
})

export default DatabaseContext

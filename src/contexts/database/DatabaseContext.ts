import { createContext } from 'react'
import { AttendedEvents, IdToEventMap, Requirement } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: IdToEventMap
  scores: any
  semester: string
  onFetchAttendedEvents: () => void
  onFetchScores: () => void
  onSetSemester: (semester: string) => void
  requirements: Requirement[]
}

const DatabaseContext = createContext<DatabaseContextValue>({
  attendedEvents: [],
  events: {},
  scores: [],
  semester: 'Sp23',
  onFetchAttendedEvents: () => {},
  onFetchScores: () => {},
  onSetSemester: () => {},
  requirements: [],
})

export default DatabaseContext

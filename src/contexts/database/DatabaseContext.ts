import { createContext } from 'react'
import { AttendedEvents, Event, IdToEventMap, Requirement } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: IdToEventMap
  allEvents: Event[]
  requirements: Requirement[]
  jwt: string | null
  onAttendEvent: (eventId: string) => void
  onCreateUser: (name: string, email: string) => void
  onLogInUser: () => void
  onFetchAllEvents: () => void
}

const DatabaseContext = createContext<DatabaseContextValue>({
  attendedEvents: [],
  events: {},
  allEvents: [],
  requirements: [],
  jwt: '',
  onAttendEvent: () => {},
  onCreateUser: () => {},
  onLogInUser: () => {},
  onFetchAllEvents: () => {},
})

export default DatabaseContext

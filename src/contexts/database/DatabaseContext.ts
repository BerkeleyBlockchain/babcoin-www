import { createContext } from 'react'
import { AttendedEvents, Event, IdToEventMap } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: IdToEventMap
  allEvents: Event[]
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
  jwt: '',
  onAttendEvent: () => {},
  onCreateUser: () => {},
  onLogInUser: () => { },
  onFetchAllEvents: () => { },
})

export default DatabaseContext

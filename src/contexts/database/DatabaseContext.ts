import { createContext } from 'react'
import { AttendedEvents, Event, IdToEventMap } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: IdToEventMap
  jwt: string | null
  onAttendEvent: (eventId: string) => void
  onCreateUser: (name: string, email: string) => void
  onLogInUser: () => void
}

const DatabaseContext = createContext<DatabaseContextValue>({
  attendedEvents: [],
  events: {},
  jwt: '',
  onAttendEvent: () => {},
  onCreateUser: () => {},
  onLogInUser: () => {},
})

export default DatabaseContext

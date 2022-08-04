import { createContext } from 'react'
import { AttendedEvents, Event, IdToEventMap } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: IdToEventMap
  onAttendEvent: (eventId: string) => void
  onCreateUser: (name: string, email: string) => void
}

const DatabaseContext = createContext<DatabaseContextValue>({
  attendedEvents: [],
  events: {},
  onAttendEvent: () => {},
  onCreateUser: () => {},
})

export default DatabaseContext

import { createContext } from 'react'
import { AttendedEvents, Event } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: Event[]
  onMint: (eventId: string) => void
  onCreateUser: (name: string, email: string) => void
}

const DatabaseContext = createContext<DatabaseContextValue>({
  attendedEvents: [],
  events: [],
  onMint: () => {},
  onCreateUser: () => {},
})

export default DatabaseContext

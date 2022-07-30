import { createContext } from 'react'
import { AttendedEvents, Event } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: Event[]
  onMint: (eventId: string) => void
  onSubmit: (name: string, email: string) => void
}

const DatabaseContext = createContext<DatabaseContextValue>({
  attendedEvents: [],
  events: [],
  onMint: () => {},
  onSubmit: () => {},
})

export default DatabaseContext

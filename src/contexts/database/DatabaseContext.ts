import { createContext } from 'react'
import { AttendedEvents, Event } from './types'

interface DatabaseContextValue {
  events: Event[]
  attendedEvents: AttendedEvents[]
  onMint: (eventId: string) => void
  onSubmit: (name: string, email: string) => void
}

const DatabaseContext = createContext<DatabaseContextValue>({
  events: [],
  onMint: () => { },
  attendedEvents: [],
  onSubmit: () => { },
})

export default DatabaseContext

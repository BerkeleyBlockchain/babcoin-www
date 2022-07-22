import { createContext } from 'react'
import { AttendedEvents, Event } from './types'

interface DatabaseContextValue {
  events: Event[]
  attendedEvents: AttendedEvents[]
  onMint: (eventId: string) => void
}

const DatabaseContext = createContext<DatabaseContextValue>({
  events: [],
  onMint: () => { },
  attendedEvents: [],
})

export default DatabaseContext

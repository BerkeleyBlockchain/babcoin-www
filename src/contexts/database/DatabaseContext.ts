import { createContext } from 'react'
import { Event } from './types'

interface DatabaseContextValue {
  events: Event[]
  onMint: (eventId: string) => void
}

const DatabaseContext = createContext<DatabaseContextValue>({
  events: [],
  onMint: () => {},
})

export default DatabaseContext

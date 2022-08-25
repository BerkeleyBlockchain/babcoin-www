import { createContext } from 'react'
import { AttendedEvents, Event, IdToEventMap } from './types'

interface DatabaseContextValue {
  attendedEvents: AttendedEvents[]
  events: IdToEventMap
}

const DatabaseContext = createContext<DatabaseContextValue>({
  attendedEvents: [],
  events: {},
})

export default DatabaseContext

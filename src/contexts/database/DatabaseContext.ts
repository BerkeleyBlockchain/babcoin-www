import { createContext } from 'react'
import { Event } from './types'

interface DatabaseContextValue {
  events: Event[]
}

const DatabaseContext = createContext<DatabaseContextValue>({
  events: [],
})

export default DatabaseContext

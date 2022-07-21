import { useCallback, useEffect, useState } from 'react'
import DatabaseContext from './DatabaseContext'
import { Event } from './types'

interface Props {
  children: React.ReactNode
}

const BASE_URL = 'https://babcoin-backend.herokuapp.com/v1/'

const DatabaseProvider: React.FC<Props> = ({ children }) => {
  // 1. Create a state variable
  const [events, setEvents] = useState<Event[]>([])

  // 2. Create a memoized (useCallback) function to fetch
  const handleFetchEvents = useCallback(async () => {
    const res = await fetch(`${BASE_URL}event`).then((res) => res.json())
    setEvents(res as Event[])
  }, [])

  // 3. Call fetch function on page load
  useEffect(() => {
    handleFetchEvents()
  }, [handleFetchEvents])

  return (
    // 4. Pass the state variable to the context
    // 5. Look at Home to see how to use the context
    <DatabaseContext.Provider value={{ events }}>
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider
